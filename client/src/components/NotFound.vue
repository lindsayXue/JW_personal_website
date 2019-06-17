<template>
  <v-layout id="not-found" row wrap justify-center align-start>
    <v-flex md6 xs11 class="my-4">
      <h1 class="font-weight-regular error--text mb-4">Page not found :(</h1>
      <v-btn dark color="tertiary" to="/">
        <i class="fas fa-arrow-left pr-2"></i>Home
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>


export default {

}
</script>
<style scoped>
#not-found {
  height: 100vh;
  background: var(--v-lightGrey-base);
}

#not-found h1 {
  font-size: 2rem;
}
</style>

