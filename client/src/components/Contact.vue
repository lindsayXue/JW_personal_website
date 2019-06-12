<template>
  <div id="contact">
    <Banner
      class="banner"
      title="CONTACT"
      detail="Feel free to contact me if you have questions with regards to my research"
    ></Banner>
    <v-layout class="content primary--text" row wrap align-center>
      <v-flex md5 xs11>
        <h2 class="font-weight-regular mb-4">
          <i class="fas fa-envelope icon px-2"></i>
          <a href="mailto:yuanjiewu925@gmail.com">yuanjiewu925@gmail.com</a>
        </h2>
        <h2 class="font-weight-regular mb-4">
          <i class="fas fa-map-marker-alt icon px-2"></i>Christchurch, New Zealand
        </h2>
        <div class="social">
          <a class="social-icon" href="https://www.facebook.com/lingzi.xue.1" target="_blank">
            <i class="fab fa-facebook fa-2x"></i>
          </a>
          <a
            class="social-icon"
            href="https://www.linkedin.com/in/lingzi-xue-a7165469/"
            target="_blank"
          >
            <i class="fab fa-linkedin fa-2x"></i>
          </a>
          <a class="social-icon" href="https://github.com/lindsayXue" target="_blank">
            <i class="fab fa-github fa-2x"></i>
          </a>
          <a
            class="social-icon"
            href="https://www.youtube.com/channel/UCmn2R5vLEJTHKJphaZ9Gy_A"
            target="_blank"
          >
            <i class="fab fa-youtube-square fa-2x"></i>
          </a>
        </div>
      </v-flex>
      <v-flex md5 xs11>
        <v-img width="500" height="500" class="secondary hidden-sm-and-down"></v-img>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Banner from './common/Banner'
export default {
  components: {
    Banner
  }
}
</script>
<style scoped>
.content {
  padding: 2rem 5vw;
  height: calc(100vh - 280px);
}
.icon {
  color: var(--v-tertiary-base);
}
.social-icon {
  color: var(--v-primary-base);
  margin: 5px;
}
.social-icon:hover {
  color: var(--v-tertiary-base);
  transition: color 0.5s;
}
</style>
