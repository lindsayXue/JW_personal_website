<template>
  <div id="blog">
    <Banner class="banner" title="blog"></Banner>
    <router-view></router-view>
  </div>
</template>
<script>
import Banner from '../common/Banner'

export default {
  components: {
    Banner
  }
}
</script>
<style scoped>
.banner {
  background: url(../../assets/blog_banner_bg.svg) center/cover no-repeat;
}
</style>

