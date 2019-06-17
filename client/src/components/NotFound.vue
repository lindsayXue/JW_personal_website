<template>
  <v-layout id="not-found" class="lightGrey" row wrap justify-center align-start>
    <v-flex md6 xs11 class="my-4">
      <h1 class="font-weight-regular primary--text my-4">
        OOPS!!!
        <i class="fas fa-times-circle"></i>
      </h1>
      <h1 class="font-weight-regular error--text my-4">404 Error</h1>
      <h1 class="font-weight-regular primary--text my-4">Looks like this page doesn't exist :(</h1>
      <v-btn dark color="primary" to="/" large>
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
}

#not-found h1 {
  font-size: 2rem;
}
</style>

