<template>
  <v-footer
    class="footer secondary white--text"
    height="50"
    absolute
  >{{!footer? "2019&copy; Jason Wu" : footer}}</v-footer>
</template>
<script>
import LayoutService from '../../services/Layout'

export default {
  data () {
    return {
      footer: ''
    }
  },
  async mounted () {
    try {
      const res = await LayoutService.getLayout()
      if (res.data) {
        this.footer = res.data.footer
      }
    } catch (err) {
      this.$store.dispatch('setErrors', err.response.data.errors)
    }
  },
}
</script>
<style scoped>
.footer {
  justify-content: center;
  font-size: 1.2rem;
}
</style>ß
