<template>
  <v-footer class="footer secondary white--text" height="50" absolute>
    {{!footer? "2019&copy; Jason Wu" : footer}}
    <v-dialog v-model="dialog" width="600">
      <template v-slot:activator="{ on }">
        <v-btn flat dark small v-on="on" absolute right>
          <i class="fas fa-edit"></i>
        </v-btn>
      </template>
      <FooterHandler v-on:closeDialog="closeDialog" v-on:updateFooter="updateFooter"/>
    </v-dialog>
  </v-footer>
</template>
<script>
import FooterHandler from '../admin/FooterHandler'
import LayoutService from '../../services/Layout'

export default {
  components: {
    FooterHandler
  },
  data () {
    return {
      footer: '',
      dialog: false
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    },
    updateFooter (updateData) {
      this.footer = updateData
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
