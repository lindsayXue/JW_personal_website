<template>
  <div>
    <v-toolbar
      app
      flat
      fixed
      prominent
      v-if="!$vuetify.breakpoint.lgAndUp"
      class="nav-toolbar primary white--text py-2"
    >
      <div class="logo-toolbar">
        <v-img
          class="logo"
          :src="$store.state.profile.imgURL"
          alt="Fail to download the image"
          aspect-ratio="1"
          position="top center"
        >
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="white"></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
      </div>
      <v-toolbar-title
        v-if="$store.state.profile"
        class="textGrey--text font-weight-bold"
      >{{$store.state.profile.firstName}} {{$store.state.profile.lastName}}</v-toolbar-title>
      <v-dialog
        v-model="dialogEdit"
        width="600"
        v-if="!!$store.state.profile && $store.state.isAdmin"
        persistent
      >
        <template v-slot:activator="{ on }">
          <v-btn flat dark fab v-on="on" class="hidden-md-and-up">
            <i class="fas fa-edit"></i>
          </v-btn>
        </template>
        <ProfileHandler v-on:closeDialog="closeDialogEdit"/>
      </v-dialog>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-dialog
          v-model="dialog"
          width="600"
          v-if="!$store.state.profile && $store.state.isAdmin"
          persistent
        >
          <template v-slot:activator="{ on }">
            <v-btn flat dark v-on="on">
              <i class="fas fa-plus pr-2"></i> profile
            </v-btn>
          </template>
          <ProfileHandler v-on:closeDialog="closeDialog"/>
        </v-dialog>
        <v-btn
          flat
          dark
          @click.stop="drawerMedium = !drawerMedium"
          class="hidden-lg-and-up hidden-sm-and-down"
        >
          <i class="fas fa-bars fa-2x"></i>
        </v-btn>
        <v-btn flat dark @click.stop="drawerSmall = !drawerSmall" class="hidden-md-and-up">
          <i class="fas fa-bars fa-2x"></i>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer app fixed class="nav-side primary hidden-md-and-down">
      <NavContent/>
    </v-navigation-drawer>
    <v-navigation-drawer app v-model="drawerMedium" temporary fixed class="nav-medium primary">
      <NavContent/>
    </v-navigation-drawer>
    <v-navigation-drawer
      class="nav-small primary"
      v-model="drawerSmall"
      app
      fixed
      temporary
      height="250"
    >
      <NavContent/>
    </v-navigation-drawer>
  </div>
</template>
<script>
import NavContent from './NavContent'
import ProfileHandler from '../../admin/ProfileHandler'

export default {
  components: {
    NavContent,
    ProfileHandler
  },
  data () {
    return {
      drawerMedium: false,
      drawerSmall: false,
      dialog: false,
      dialogEdit: false
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    },
    closeDialogEdit () {
      this.dialogEdit = false
    }
  },
}
</script>
<style scoped>
.logo-toolbar {
  /* background: url(../../../assets/Logo.jpg) no-repeat center;
  background-size: cover; */

  width: 60px;
  height: 60px;
}
.logo {
  border: 2px solid white;
  border-radius: 50%;
}
.nav-small {
  top: 80px;
}
</style>
