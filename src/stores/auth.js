import { defineStore } from 'pinia'
import { SessionStorage } from 'quasar'

// SessionStorage.getItem('user')
export const useAuthStore = () => {
  const innerStore = defineStore('auth', {
    state: () => ({
      token: '',
      info: null,
      blocked: false,
      region: null,
      connected: false
    }),
    getters: {
    },
    actions: {
      setBlocked (blocked) {
        this.blocked = blocked
      },
      setTokenInfo (info) {
        this.info = info
      },
      loginRedirect () {

      },
      restorePath () {

      },
      init () {
        console.log(this)
        this.region = this.$region
      },
      setToken (token) {
        this.region = this.$region
        // commit('clean')
        this.$connector.socket.off('error')
        this.$connector.socket.on('error', (e) => {
          if (e && (e.code === 2 || e.code === 135 || e.code === 134)) {
            this.blocked = false
          }
          if (e && (e.code === 138 || e.code === 151)) {
            this.blocked = true
          }
          this.connected = false
        })
        this.$connector.socket.off('close')
        this.$connector.socket.on('close', (e) => {
          console.log('Close MQTT')
          this.connected = false
        })
        this.$connector.socket.off('disconnect')
        this.$connector.socket.on('disconnect', (e) => {
          console.log('Disconnect MQTT')
          this.connected = false
        })
        this.$connector.socket.off('end')
        this.$connector.socket.on('end', (e) => {
          console.log('End MQTT')
          this.connected = false
        })
        this.$connector.socket.off('connect')
        this.$connector.socket.on('connect', (e) => {
          console.log('Connected MQTT')
          this.info = JSON.parse(e.properties.userProperties.token)
          this.blocked = false
          this.connected = true
          // commit('setTokenInfo', JSON.parse(e.properties.userProperties.token))
        })

        if (token.length === 0) {
          console.log('Logout setToken')
          SessionStorage.remove('token')
          this.token = ''
          this.$connector.socket.end()
        } else {
          if (token.indexOf('FlespiToken') >= 0) {
            this.$connector.token = token
            this.token = token
          } else {
            this.$connector.token = `FlespiToken ${token}`
            this.token = token
          }
          SessionStorage.set('token', this.token)
          console.log(this.$connector.auth.getInfo().then(a => { console.log(a) }))
        }
      }
    }
  })
  const s = innerStore()
  const token = SessionStorage.getItem('token')
  if (token && !s.token) {
    s.setToken(token)
  }
  return s
}
