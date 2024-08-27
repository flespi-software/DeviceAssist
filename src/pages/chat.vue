<template>
  <q-page style="height:100%;" :class="'q-pa-md ai-chat bg-' + color">
    <div class="text-white" style="max-width:100%; width:800px;margin: 10px auto;" v-if="connected">
      <q-select dark :options="devicelist" v-model="device_type_id" v-if="!devicetype && devicelist.length>1" emit-value map-options />
      <div v-if="devicetype" class="rounded-borders bg-green-9 q-pa-md aidisclaimer" style="border: 1px dashed #fff;max-width:100%; width:800px;margin: 10px auto">
        <div v-html="parseLinks(disclaimer)"/>
        </div>
      <template v-if="chat.length>0">
        <template v-for="(msg, index) in chat" :key="'request' + msg.timestamp">
          <q-chat-message
            bg-color="blue-grey"
            sent
            dark
            size="12"
          >
            <template v-slot:name>You</template>
            <div v-html="parseLinks(msg.request.text)" />
          </q-chat-message>
          <q-chat-message
            bg-color="light-green-9"
            dark
            size="12"
          >
            <template v-slot:name>AI Assistant</template>
            <template v-slot:avatar>
              <div class="bg-light-green-7 text-white text-center uppercase inset-shadow gt-sm" style="border-radius: 50%; overflow: hidden; margin: 5px; width: 40px; height: 40px; min-width: 40px; padding-top: 11px; border: 1px dashed rgb(255, 255, 255);">
                <q-icon name="mdi-robot-excited" size="30px" />
              </div>
            </template>
            <div v-if="msg.response" class="q-pb-lg">
              <div  v-html="parseLinks(msg.response.text)" />
              <q-btn-group rounded class="float-right">
                <q-btn icon="mdi-content-copy" @click="copy(msg.response.text)" size="sm" dense class="q-px-xs"/>
                <q-btn :icon="msg.reaction === 'like' ? 'mdi-thumb-up' :'mdi-thumb-up-outline'" @click="reaction(index, 'like')" size="sm" dense class="q-px-xs"/>
                <q-btn :icon="msg.reaction === 'dislike' ? 'mdi-thumb-down' :'mdi-thumb-down-outline'" @click="reaction(index, 'dislike')" size="sm" dense class="q-px-xs"/>
              </q-btn-group>
            </div>
            <q-spinner-dots v-else size="2rem" />
          </q-chat-message>
        </template>
      </template>
      <div id="latest" />
    </div>

    <q-footer style="height: 140px;" :class="`bg-${color}`" v-if="devicetype && connected">
      <div style="max-height:30px;max-width:100%; width:800px;margin: 10px auto;" class="relative-position">
        <q-input ref="input" autofocus v-model="text" @input="typing" :disable="processing" dark color="white" :bg-color="`${color}-8`" style="z-index:8;position:relative;" outlined type="textarea" dense placeholder="Enter your request here" @keydown.enter.ctrl="postMessage(text)">
          <template v-slot:append>
            <q-btn  :disable="text.length < 3 || processing" @click="postMessage(text)" icon="mdi-send" class="rotate-315" flat round style="margin:30px -10px 0;"/>
          </template>
        </q-input>
        <div v-if="devicetype && devicetype.features && devicetype.features.knowledge" @click="toggleKnowledge" :class="`absolute-top-left q-px-sm q-pb-md cursor-pointer ${knowledgeState ? '' : (hop ? ' bounce-up hop' : ' bounce-up')} ${!knowledgeState ? 'bg-white text-orange-9' : 'bg-green text-white'} text-bold shadow-2`" style="top: -19px;border-radius: 5px 5px 0 0;z-index:0; width:138px; ">
          <q-linear-progress indeterminate v-if="knowledgeLoading" class="absolute-top" color="white" size="2px" />
          <q-icon :name="knowledgeState ? 'mdi-lightbulb-question' : 'mdi-lightbulb-question-outline'" /> Knowledge: {{knowledgeState ? 'ON' : 'OFF'}}
          <div @click.exact.stop="() => {}" class="bg-green absolute-bottom-left rounded-borders" style="bottom:40px;width:600px;max-width: calc(100vw - 30px);" v-if="knowledgeLinks && knowledgeState">
            <q-btn @click.exact.stop="knowledgeLinks=null" flat round color="white" icon="mdi-close" size="sm" class="absolute-top-right " style="z-index:1;top:6px; right:6px;"/>
            <q-list style="max-height:300px;overflow:auto;">
              <q-item v-for="(link, index) in knowledgeLinks" :key="link.link + index" dark :href="link.link" target="_blank">
                <q-item-section avatar style="min-width:30px;">
                  <q-icon name="mdi-link" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{link.title}}</q-item-label>
                  <q-item-label :lines="1" caption>{{link.content}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <q-tooltip v-if="knowledgeLinks===null" anchor="top left" self="bottom left" content-class="bg-green-8" content-style="width:350px;font-size:12px;">
            As soon as you type a word or finish typing, automatically search for a few articles in manufacturer's documentation that may contain information related to your message.
          </q-tooltip>
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script lang="js">

import { scroll, throttle, debounce, openURL, copyToClipboard, Notify } from 'quasar'

import { mapState } from 'pinia'
import { useAuthStore } from '../stores/auth'

const { setVerticalScrollPosition, getScrollTarget } = scroll
import MarkdownIt from 'markdown-it'
// import emoji from 'markdown-it-emoji'

const md = new MarkdownIt() // .use(emoji)
const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options)
const defaultLinkOpenRenderer = md.renderer.rules.link_open || proxy

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  tokens[idx].attrJoin('rel', 'noopener noreferrer')
  tokens[idx].attrJoin('target', '_blank')
  return defaultLinkOpenRenderer(tokens, idx, options, env, self)
}

export default {
  name: 'AIChat',
  components: {
    // Gravatar
  },
  props: {
    item: null
  },
  data () {
    let knowledgeState = true
    if (this.$q.localStorage.has('x-flespi-device-knowledge')) {
      knowledgeState = this.$q.localStorage.getItem('x-flespi-device-knowledge')
    }
    return {

      disclaimer: '',

      hop: false,
      knowledgeLinks: null,
      knowledgeState,
      knowledgeLoading: false,
      text: '',
      chat: [],
      processing: false,
      thread_id: '',
      color: 'grey',
      devicetypes: {},
      device_type_id: 0
    }
  },
  computed: {
    ...mapState(useAuthStore, {
      region: store => store.region,
      token: store => store.token,
      connected: store => store.connected
    }),
    devicetype () {
      return this.devicetypes[this.device_type_id] || null
    },
    devicelist () {
      return [{ value: 0, label: 'Select device type' }, ...Object.values(this.devicetypes).map(el => {
        return {
          value: el.id,
          label: el.title
        }
      })]
    },
    wordcount () {
      const str = this.text.replace(/[\t\n\r.?!]/gm, ' ').split(' ')
      const res = []
      str.forEach((s) => {
        const trimStr = s.trim()
        if (trimStr.length > 0) {
          res.push(trimStr)
        }
      })
      return res.length
    }
  },
  watch: {
    connected () {
      if (this.$route.query.devicetype) {
        this.device_type_id = parseInt(this.$route.query.devicetype) || 0
      }
      this.getDeviceTypes()
      this.setDisclaimer()
    },
    devicetype (val) {
      this.setDisclaimer()
    },
    knowledgeState (val) {
      this.$q.localStorage.set('x-flespi-device-knowledge', val)
    },
    wordcount (val, prev) {
      this.checkKnowledgeByWords()
    },
    processing (val) {
      if (!val) {
        this.$nextTick(() => { this.$refs.input.focus() })
      }
    }
  },
  mounted () {
    if (this.$route.query.devicetype) {
      this.device_type_id = parseInt(this.$route.query.devicetype) || 0
    }
    this.getDeviceTypes()
    this.setDisclaimer()
  },
  methods: {
    copy (text) {
      copyToClipboard(text)
        .then(() => {
          Notify.create('Copied')
        })
        .catch(() => {
          // fail
        })
    },
    onError (e) {
      console.log(e)
    },
    onResize () {
    },

    setDisclaimer () {
      this.disclaimer = `This AI assistant is familiar with the flespi platform and manufacturer's documentation for the device and can answer any questions you have that are covered in any of them.\nIt is capable of:\n - Providing detailed information on how to use flespi platform.\n - Providing detailed information on how to configure the **${(this.devicetype && this.devicetype.title) || ''}** device based on the device manual.\n - Answering user questions related to the setup, configuration, and usage of the **${(this.devicetype && this.devicetype.title) || ''}** device with flespi.\n - Sharing relevant links and resources from the device manual or flespi documentation to help you troubleshoot issues or optimize your device settings.\n\nIts limitations are:\n - It does not have access to your device’s state, properties, or telemetry.\n - It does not retain chat history between sessions.`
    },
    toggleKnowledge () {
      this.knowledgeState = !this.knowledgeState
      this.checkKnowledgeByWords()
    },

    checkKnowledgeByWords: throttle(function () {
      if (this.knowledgeState && this.text.length > 5) {
        this.knowledgeLoading = true
        this.getKnowledge(this.text)
      } else {
        this.knowledgeLoading = false
      }
    }, 200),
    checkKnowledge: debounce(function () {
      if (this.knowledgeState && this.text.length > 5) {
        this.knowledgeLoading = true
        this.getKnowledge(this.text)
      } else {
        this.knowledgeLoading = false
      }
    }, 1000),

    typing () {
      this.typ()
      this.checkKnowledge()
      // this.loadkKnowledge()
    },
    typ: throttle(function () {
      this.hop = true
      setTimeout(() => {
        this.hop = false
      }, 500)
    }, 3000),

    openURL,

    reaction (index, type) {
      const data = {
        reaction: type,
        thread_id: this.thread_id || undefined,
        timestamp: this.chat[index].response_timestamp
      }
      this.$connector.http.post(`/gw/channel-protocols/all/device-types/${this.device_type_id}/assistance`, data).then((response) => {
        if (response.data.result && response.data.result[0]) {
          this.chat.splice(index, 1, {
            ...this.chat[index],
            reaction: type
          })
        }
        this.onError(response)
      }, (response) => {
        this.onError(response.response)
      })
    },
    postMessage (request) {
      const timestamp = Date.now() / 1000
      const index = this.chat.push({
        timestamp,
        request: { role: 'user', text: request }
      }) - 1
      const data = {
        text: request,
        thread_id: this.thread_id || undefined,
        mode: 'flespi'
      }
      if (this.thread_id) {
        data.thread_id = this.thread_id
      }
      this.processing = true
      this.$nextTick(() => { this.knowledgeLinks = null })
      this.scrollToLatest()
      this.$connector.http.post(`/gw/channel-protocols/all/device-types/${this.device_type_id}/assistance`, data).then((response) => {
        if (response.data.result && response.data.result[0] && response.data.result[0].response) {
          this.chat.splice(index, 1, {
            ...this.chat[index],
            response_timestamp: response.data.result[0].timestamp,
            response: { role: 'assistant', text: response.data.result[0].response }
          })
          if (response.data.result[0].thread_id) {
            this.thread_id = response.data.result[0].thread_id
          }
          this.text = ''
          this.scrollToLatest()
        } else {
          this.chat.splice(index, 1)
        }
        this.onError(response)
        this.processing = false
      }, (response) => {
        this.chat.splice(index, 1)
        this.onError(response.response)
        this.processing = false
      })
    },
    getKnowledge (context) {
      if (this.devicetype && this.devicetype.features && this.devicetype.features.knowledge) {
        const reqparams = { context, max_count: 5 }
        this.$connector.http.get(`/gw/channel-protocols/all/device-types/${this.device_type_id}/knowledge`, { params: { data: JSON.stringify(reqparams) } })
          .then((resp) => {
            if (this.text.length > 0 && resp.data && resp.data.result && resp.data.result.length > 0 && !this.processing) {
              this.knowledgeLinks = resp.data.result
            } else {
              this.knowledgeLinks = null
            }
            this.knowledgeLoading = false
          })
          .catch(() => {
            this.knowledgeLinks = null
            this.knowledgeLoading = false
          })
      }
    },
    getDeviceTypes () {
      this.devicetypesloading = true
      this.$connector.http.get('/gw/channel-protocols/all/device-types/{features.knowledge==true}', { params: { fields: 'id,name,title,features' } })
        .then((resp) => {
          if (resp.data && resp.data.result && resp.data.result.length > 0) {
            this.devicetypes = resp.data.result.reduce((obj, val) => {
              obj[val.id] = val
              return obj
            }, {})
          } else {
            this.devicetypes = {}
          }
          if (!this.devicetypes[this.device_type_id]) {
            this.device_type_id = 0
          }
          this.devicetypesloading = false
        })
        .catch(() => {
          this.devicetypesloading = false
        })
    },
    scrollToLatest () {
      this.$nextTick(() => {
        const el = document.querySelector('#latest')
        if (el) {
          const target = getScrollTarget(el)
          const offset = el.offsetTop
          // let duration = 0

          setVerticalScrollPosition(target, offset - 100, 100)
        }
      })
    },

    parseLinks (text, supporters, me) {
      if (typeof text === 'undefined') return undefined

      md.set({
        html: false,
        xhtmlOut: true,
        breaks: true,
        linkify: true,
        typographer: true,
        langPrefix: 'language-',
        quotes: '""\'\''
      })
      md.linkify.set({ fuzzyEmail: true })

      md.disable(['image'])
      const t = md.render(text)
      return t
    }

  }
}
</script>

<style lang="sass">
.ai-chat
  .q-message-text-content, .aidisclaimer
    color: #fff!important
    a
      color: #fc0
  .q-message-text-content
    p:last-child
      margin-bottom: 0
    pre
      background: #333
      padding:7px
      border-radius: 5px
      border-left:3px #0f0 solid
    code, pre
      white-space: pre-wrap
    h1,h2,h3,h4,h5,h6
      font-size: 18px
      line-height: 18px
    table
      border-collapse: collapse
    table, th, td
      border: 1px solid #fff
    td
      padding: 5px
  .q-message-container>div
    // width: calc(100%) //  - 50px fix for firefox message overflow
    .q-message-text
      word-wrap: break-word
      position: relative
      .q-message-text-content
        display: block
</style>
