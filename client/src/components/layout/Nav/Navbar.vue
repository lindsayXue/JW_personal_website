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
      <div class="logo-toolbar"></div>
      <v-toolbar-title class="textGrey--text font-weight-bold">Jason Wu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          icon
          @click.stop="drawerMedium = !drawerMedium"
          class="white--text hidden-lg-and-up hidden-sm-and-down"
        >
          <i class="fas fa-bars fa-2x"></i>
        </v-btn>
        <v-btn icon @click.stop="drawerSmall = !drawerSmall" class="white--text hidden-md-and-up">
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

export default {
  components: {
    NavContent
  },
  data () {
    return {
      drawerMedium: false,
      drawerSmall: false
    }
  }
}
</script>
<style scoped>
.logo-toolbar {
  background: url(../../../assets/Logo.jpg) no-repeat center;
  background-size: cover;
  border: 2px solid white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
.nav-small {
  top: 80px;
}
</style>
