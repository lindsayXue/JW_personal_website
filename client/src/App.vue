<template>
  <v-app id="app">
    <v-container fluid>
      <navbar/>
      <main>
        <router-view></router-view>
      </main>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from './components/Layout/Navbar'
export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
/* #app {
  font-family: "Montserrat", sans-serif;
} */

h1 {
  font-size: 1.8rem;
}
</style>
