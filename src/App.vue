<template>
  <router-view :color="color" :text-color="colors[color]" :mode="mode" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data () {
    return {
      mode: 'external',
      color: 'grey',
      colors: {
        grey: 'white',
        'blue-grey': 'white',
        brown: 'white',
        'deep-orange': 'white',
        orange: 'white',
        amber: 'white',
        yellow: 'black',
        lime: 'black',
        green: 'white',
        'light-green': 'black',
        teal: 'white',
        cyan: 'white',
        'light-blue': 'white',
        blue: 'white',
        indigo: 'white',
        'deep-purple': 'white',
        purple: 'white',
        pink: 'white',
        red: 'white'
      }
    }
  },
  watch: {
    '$route.query.color': function () {
      if (this.$route.query.color) {
        this.color = this.colors[this.$route.query.color] ? this.$route.query.color : 'grey'
      }
    },
    '$route.query.mode': function () {
      if (this.$route.query.mode) {
        this.mode = this.$route.query.mode === 'flespi' ? 'flespi' : 'external'
      }
    }
  },
  mounted () {
    if (this.$route.query.mode) {
      this.mode = this.$route.query.mode === 'flespi' ? 'flespi' : 'external'
    }
    if (this.$route.query.color) {
      this.color = this.colors[this.$route.query.color] ? this.$route.query.color : 'grey'
    }
  }
})
</script>
