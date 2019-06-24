<template>
  <div class="research">
    <Banner class="banner" title="research"></Banner>
    <v-layout row wrap justify-center>
      <v-flex md8 order-md1 order-sm2 order-xs2 class="about">
        <ContentArea title :content="$store.state.profile?$store.state.profile.aboutresearch : ''"/>
      </v-flex>
      <v-flex md4 xs11 order-md2 order-sm1 order-xs1 class="interests">
        <ListArea
          class="tertiary--text"
          title="Interests"
          :listData="$store.state.profile? $store.state.profile.interests: ''"
        />
      </v-flex>
    </v-layout>
    <ProjectsList
      class="lightGrey"
      title="Research Projects"
      :projectsData="$store.state.profile? $store.state.profile.projects: ''"
    />
  </div>
</template>
<script>
import Banner from './common/Banner'
import ContentArea from './common/ContentArea'
import ListArea from './common/ListArea'
import ProjectsList from './common/PojectsList'

export default {
  components: {
    Banner,
    ContentArea,
    ListArea,
    ProjectsList
  }
}
</script>
<style scoped>
.banner {
  background: url(../assets/home_banner_bg.svg) center right/cover no-repeat;
}
.research .about {
  padding: 6rem 10vw;
}
.research .interests {
  padding: 6rem 0;
}
</style>

