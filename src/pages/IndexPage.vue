<template>
  <q-page style="height:100%;" :class="'q-pa-md ai-chat'">
    <div class="text-white" style="max-width:100%; width:800px;margin: 10px auto;" v-if="connected">
      <div class="row">
        <div class="col-12">
          <q-input v-model="filter" autofocus debounce="500" filled type="search" hint="Filter">
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </div>
        <div v-for="dev in devicelist" :key="dev.value" class="col-md-3 col-sm-4 col-12">
          <a :href="`#/chat?devicetype=${dev.value}`" class="text-white">
            <q-card class="my-card q-ma-xs" style="height:170px;" :title="descriptions[dev.value] && descriptions[dev.value].meta_description">
              <div class="q-pa-md text-center" style="height:170px;">
                <img v-if="descriptions[dev.value] && descriptions[dev.value].image !== ''" loading="lazy" :src="descriptions[dev.value].image" style="max-height:150px;max-width:100%;"/>
                <img v-else loading="lazy" src="../assets/device.svg" style="max-height:150px;max-width:100%;opacity:.1;"/>
              </div>
              <div class="absolute-bottom text-center" style="background:rgba(0,0,0,.5)">
                {{dev.label}}
              </div>
            </q-card>
          </a>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useDevicesStore } from '../stores/devices'
import { useAuthStore } from '../stores/auth'
import { mapState, mapActions } from 'pinia'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      colors: {
        grey: 'white'
      },
      color: 'grey',
      filter: ''
    }
  },
  computed: {
    ...mapState(useDevicesStore, {
      deviceTypeId: store => store.deviceTypeId,
      devicetypes: store => store.devicetypes,
      devicetypesloading: store => store.devicetypesloading,
      descriptions: store => store.descriptions
    }),
    ...mapState(useAuthStore, {
      region: store => store.region,
      token: store => store.token,
      connected: store => store.connected
    }),
    devicelist () {
      let list = [...Object.values(this.devicetypes).map(el => { // { value: 0, label: 'Select device type' },
        return {
          value: el.id,
          label: el.title,
          sublabel: el.name
        }
      })].sort((a, b) => a.label.localeCompare(b.label))
      if (this.filter) {
        list = list.filter((el) => el.label.toLowerCase().indexOf(this.filter) > -1)
      }
      return list
    }
  },
  watch: {
    connected () {
      this.getDeviceTypes()
    }
  },
  methods: {
    ...mapActions(useDevicesStore, ['getDeviceTypes', 'getDeviceDesc', 'setDeviceTypeId'])
  }
})
</script>
