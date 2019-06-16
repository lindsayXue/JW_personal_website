<template>
  <div id="home">
    <Banner class="banner" title="home"></Banner>
    <ContentArea
      class="about"
      title="about"
      :content="$store.state.profile? $store.state.profile.aboutme: ''"
    />
    <TimeLineArea
      class="lightGrey"
      title="education"
      :timelineData="$store.state.profile? $store.state.profile.education : ''"
    />
    <TimeLineArea
      title="experience"
      :timelineData="$store.state.profile?$store.state.profile.experience : ''"
    />
  </div>
</template>
<script>
import Banner from './common/Banner'
import ContentArea from './common/ContentArea'
import TimeLineArea from './common/TimeLineArea'

export default {
  components: {
    Banner,
    ContentArea,
    TimeLineArea
  }
}
</script>
<style scoped>
.banner {
  background: url(../assets/home_banner_bg.svg) center/cover no-repeat;
}
.about {
  padding: 2rem 5vw;
}
</style>

