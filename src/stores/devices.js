import { defineStore } from 'pinia'

export const useDevicesStore = () => {
  const innerStore = defineStore('devcies', {
    state: () => ({
      deviceTypeId: 0,
      devicetypes: {},
      devicetypesloading: false,
      descriptions: {}
    }),
    getters: {
    },
    actions: {
      setDeviceTypeId (deviceTypeId) {
        this.deviceTypeId = deviceTypeId
      },
      getDeviceTypes () {
        this.devicetypesloading = true
        this.$connector.http.get('/gw/channel-protocols/all/device-types/{features.assistance==true}', { params: { fields: 'id,name,title,features' } })
          .then((resp) => {
            if (resp.data && resp.data.result && resp.data.result.length > 0) {
              this.devicetypes = resp.data.result.reduce((obj, val) => {
                obj[val.id] = val
                return obj
              }, {})
            } else {
              this.devicetypes = {}
            }
            if (!this.devicetypes[this.deviceTypeId]) {
              this.deviceTypeId = 0
            }
            this.devicetypesloading = false
          })
          .catch(() => {
            this.devicetypesloading = false
          })
        this.getDeviceDesc()
      },
      getDeviceDesc () {
        this.$connector.http.get('https://flespi.com/api/devices')
          .then((resp) => {
            this.descriptions = resp.data.result.reduce((obj, el) => {
              obj[el.io_id] = el
              return obj
            }, {})
          })
          .catch(() => {
          })
      }
    }
  })
  const s = innerStore()
  return s
}
