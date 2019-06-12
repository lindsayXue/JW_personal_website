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
    title: String,
    detail: String
  }
}
</script>
<style scoped>
#banner {
  height: 280px;
  background-color: var(--v-tertiary-base);
  /* background: url(../../assets/home_banner_bg.svg) center/cover no-repeat; */
}
.content {
  padding-left: 5vw;
}
</style>

