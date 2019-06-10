<template>
  <v-app id="app">
    <navbar/>
    <v-content>
      <v-container fluid pa-0>
        <main>
          <v-slide-x-reverse-transition>
            <router-view></router-view>
          </v-slide-x-reverse-transition>
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
  }
}
</script>

<style>
h1 {
  font-size: 1.8rem;
}
.detail {
  font-size: 1.2rem;
  font-style: italic;
}
</style>
