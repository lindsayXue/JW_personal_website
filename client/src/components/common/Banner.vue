<template>
  <v-layout id="banner" align-center>
    <v-flex class="content white--text">
      <h1 class="font-weight-regular mb-4">{{title}}</h1>
      <p class="detail">{{detail}}</p>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    bgImg: String,
    title: String,
    detail: String
  }
}
</script>
<style scoped>
#banner {
  height: 250px;
  background-color: var(--v-secondary-base);
  /* background: var(--v-secondary-base) url(../../assets/home_banner_bg.png) top
    center/cover no-repeat; */
}
.content {
  padding-left: 5vw;
}
</style>

