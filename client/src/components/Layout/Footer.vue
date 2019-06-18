<template>
  <v-footer class="footer primary" height="auto" absolute>
    <v-dialog v-model="dialog" width="600" v-if="$store.state.isAdmin" persistent>
      <template v-slot:activator="{ on }">
        <v-btn flat fab dark small v-on="on" absolute top right>
          <i class="fas fa-edit"></i>
        </v-btn>
      </template>
      <FooterHandler v-on:closeDialog="closeDialog" :footer="footer"/>
    </v-dialog>
    <v-card flat tile class="primary white--text text-xs-center">
      <v-card-text class="py-2">
        <a class="social-icon" :href="`mailTo:${$store.state.profile.email}`">
          <i class="fas fa-envelope fa-2x"></i>
        </a>
        <a
          class="social-icon"
          :href="$store.state.profile.socialLinks.researchgate"
          target="_blank"
        >
          <i class="fab fa-researchgate fa-2x"></i>
        </a>
        <a class="social-icon" :href="$store.state.profile.socialLinks.linkedin" target="_blank">
          <i class="fab fa-linkedin fa-2x"></i>
        </a>
        <a class="social-icon" :href="$store.state.profile.socialLinks.github" target="_blank">
          <i class="fab fa-github fa-2x"></i>
        </a>
        <a class="social-icon" :href="$store.state.profile.socialLinks.youtube" target="_blank">
          <i class="fab fa-youtube-square fa-2x"></i>
        </a>
      </v-card-text>

      <v-divider class="textGrey"></v-divider>

      <v-card-text class="textGrey--text py-2">{{!footer? "2019&copy; Jason Wu" : footer}}</v-card-text>
    </v-card>
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
    closeDialog (update) {
      this.dialog = false
      if (update) {
        this.updateFooter()
      }
    },
    async updateFooter () {
      try {
        const res = await LayoutService.getLayout()
        if (res.data) {
          this.footer = res.data.footer
        }
      } catch (err) {
        this.$store.dispatch('setErrors', err.response.data.errors)
      }
    }
  },
  mounted () {
    this.updateFooter()
  },
}
</script>
<style scoped>
.footer {
  justify-content: center;
  font-size: 1.2rem;
}

.social-icon {
  color: var(--v-textGrey-base);
  margin: 0 8px;
}
.social-icon:hover {
  color: var(--v-white-base);
  transition: color 0.5s;
}
</style>
