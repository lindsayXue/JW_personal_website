<template>
  <div id="contact">
    <Banner class="banner" title="contact"></Banner>
    <v-alert
      :value="true"
      type="error"
      class="alert my-4"
      v-if="!$store.state.profile && $store.state.isAdmin"
    >Please create profile firstly</v-alert>
    <v-layout class="content primary--text" row wrap align-center v-if="$store.state.profile">
      <v-flex md5 xs11>
        <h2 class="font-weight-regular mb-4">
          <i class="fas fa-envelope icon pr-2"></i>
          <a :href="`mailTo:${$store.state.profile.email}`">{{$store.state.profile.email}}</a>
        </h2>
        <h2 class="font-weight-regular mb-4" v-if="$store.state.profile.location">
          <i class="fas fa-map-marker-alt icon pr-2"></i>
          {{$store.state.profile.location.city}}, {{$store.state.profile.location.country}}
        </h2>
        <div class="social" v-if="$store.state.profile.socialLinks">
          <a class="social-icon" :href="$store.state.profile.socialLinks.facebook" target="_blank">
            <i class="fab fa-facebook fa-2x"></i>
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
        </div>
      </v-flex>
      <v-flex md5 xs11>
        <v-dialog v-model="dialog" width="600" v-if="$store.state.isAdmin" persistent>
          <template v-slot:activator="{ on }">
            <v-btn color="tertiary" flat light small absolute right v-on="on">
              <i class="fas fa-edit"></i>
            </v-btn>
          </template>
          <ContactImgHandler v-on:closeDialog="closeDialog" v-on:updateImg="updateImg"/>
        </v-dialog>
        <v-img
          max-width="500"
          max-height="500"
          class="secondary hidden-sm-and-down"
          :src="imgURL"
          contain
        ></v-img>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Banner from './common/Banner'
import ContactImgHandler from './admin/ContactImgHandler'

export default {
  components: {
    Banner,
    ContactImgHandler
  },
  data () {
    return {
      dialog: false,
      imgURL: 'https://i.ytimg.com/vi/MOWDb2TBYDg/maxresdefault.jpg'
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    },
    updateImg (newData) {
      this.imgURL = newData
    }
  },
}
</script>
<style scoped>
.content {
  padding: 2rem 5vw;
  height: calc(100vh - 280px);
}
.icon {
  color: var(--v-tertiary-base);
}
.social-icon {
  color: var(--v-primary-base);
  margin: 5px;
}
.social-icon:hover {
  color: var(--v-tertiary-base);
  transition: color 0.5s;
}
.alert {
  width: 300px;
}
</style>
