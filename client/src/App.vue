<template>
  <v-app id="app">
    <navbar/>
    <v-content>
      <v-container fluid pa-0>
        <main>
          <v-btn
            class="hidden-md-and-up"
            @click="$vuetify.goTo(0, {easing: 'easeInOutCubic',duration: 1000})"
            color="tertiary"
            fab
            dark
            small
            fixed
            bottom
            right
          >
            <i class="fas fa-chevron-up"></i>
          </v-btn>
          <v-scroll-y-transition mode="out-in">
            <router-view></router-view>
          </v-scroll-y-transition>
        </main>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/layout/Nav/Navbar'
export default {
  name: 'app',
  components: {
    Navbar
  },
  mounted () {
    this.$store.dispatch('getProfile')
  },
}
</script>

<style>
h1 {
  font-size: 1.8rem;
}
h2 {
  font-size: 1.4rem;
}
.detail {
  font-size: 1.2rem;
  font-style: italic;
}
</style>
