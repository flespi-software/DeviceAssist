<template>
  <q-layout view="lHh Lpr lFf" :class="`bg-${color}-2 chatbg`">
    <q-header elevated v-if="!$q.platform.within.iframe">
      <q-toolbar :class="`bg-${color}-8`">
        <q-toolbar-title>
          <q-icon name="mdi-robot-confused" size="30px" class="q-mr-md" />
          <span class="gt-xs">DeviceAssistant</span>
        </q-toolbar-title>
        <q-space />
        <q-btn v-if="!token" tabindex="0" ref="loginbutton" icon="mdi-account-circle" color="red-7" rounded @click="openWindow(`${region.rest || `https://${host}`}/login/#/providers`)" label="login" />
        <q-btn v-else tabindex="0" icon="mdi-logout" :color="textColor" round flat @click="setToken('')" title="logout" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view :color="color" :text-color="textColor" :mode="mode" />
    </q-page-container>
  </q-layout>
</template>
<style lang="sass">
.q-item--active
  color: orange

</style>
<script>
import { defineComponent } from 'vue'

import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '../stores/auth'

export default defineComponent({
  name: 'MainLayout',
  props: {
    color: String,
    textColor: String,
    mode: String
  },
  data () {
    return {
      host: 'flespi.io',
      deviceId: null
    }
  },
  computed: {
    ...mapState(useAuthStore, {
      region: store => store.region,
      token: store => store.token,
      connected: store => store.connected
    })
  },
  components: {
  },
  watch: {
    '$route.params.deviceid': function (val) {
      this.deviceId = parseInt(val)
    },
    '$route.query.token': function (val) {
      this.setToken(val)
    }
  },
  mounted () {
    const that = this
    that.init()
    if (this.$refs.loginbutton && this.$refs.loginbutton.$el) this.$refs.loginbutton.$el.focus()

    if (this.$route.query.token) {
      this.setToken(this.$route.query.token)
    }
    window.addEventListener('message', function (event) {
      if (typeof event.data === 'string' && ~event.data.indexOf('FlespiLogin|token:')) {
        const login = JSON.parse(event.data.replace('FlespiLogin|token:', ''))
        that.setToken(login.token)
      }
    })
  },
  methods: {
    ...mapActions(useAuthStore, ['setToken', 'init']),
    openWindow (url, title) {
      title = title || 'auth'
      const w = 500, h = 600
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top

      const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
      const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

      const left = ((width / 2) - (w / 2)) + dualScreenLeft
      const top = ((height / 2) - (h / 2)) + dualScreenTop
      const newWindow = window.open(url, title, 'toolbar=no,location=no,status=yes,resizable=yes,scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

      // Puts focus on the newWindow
      if (window.focus) {
        newWindow.focus()
      }
    }
  }
})
</script>

<style lang="sass">
.chatbg
  background-image: url('assets/bg.svg')!important
  background-position: center 15vh
</style>
