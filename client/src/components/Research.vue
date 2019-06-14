<template>
  <div>
    <Banner class="banner" title="research"></Banner>
    <v-layout row wrap justify-center>
      <v-flex md8 order-md1 order-sm2 order-xs2>
        <ContentArea :content="research"/>
      </v-flex>
      <v-flex md4 xs11 order-md2 order-sm1 order-xs1>
        <ListArea class="tertiary--text" title="Interests" :listData="interestsData"/>
      </v-flex>
    </v-layout>
    <ProjectsList class="lightGrey" title="Research Projects" :projectsData="projectsData"/>
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
  },
  data () {
    return {
      research: 'Yuanjie is a PhD student and his research interest is avatar mediated interaction in VR by using multiple tracking devices. Before joining HIT Lab, he completed his masters degree in signal and information processing and bachelors degree in electronic information engineering from University of Electronic Science and integration. In his spare time, Yuanjie likes watching movies, chatting with friends, hiking and other outdoor activities.',
      interestsData: [
        'VR technology',
        'VR technology',
        'VR technology',
        'VR technology',
        'VR technology'
      ],
      projectsData: [
        {
          name: 'Project Name 1',
          detail: 'Project 1 detail',
          projectImg: 'test'
        },
        {
          name: 'Project Name 2',
          detail: 'Project 2 detail',
          projectImg: 'test'
        },
        {
          name: 'Project Name 3',
          detail: 'Project 3 detail',
          projectImg: 'test'
        }
      ]
    }
  }
}
</script>
<style scoped>
.banner {
  background: url(../assets/home_banner_bg.svg) center/cover no-repeat;
}
</style>

