<template>
  <div id="home">
    <Banner class="banner" title="home"></Banner>
    <ContentArea class="about" title="about" :content="aboutme" v-on:updateContent="updateAbout"/>
    <TimeLineArea class="lightGrey" title="Education" :timelineData="educationData"/>
    <TimeLineArea title="Experience" :timelineData="experienceData"/>
  </div>
</template>
<script>
import Banner from './common/Banner'
import ContentArea from './common/ContentArea'
import TimeLineArea from './common/timeLine/TimeLineArea'
import ProfileService from '../services/Profile'

export default {
  components: {
    Banner,
    ContentArea,
    TimeLineArea
  },
  data () {
    return {
      aboutme: 'Yuanjie is a PhD student and his research interest is avatar mediated interaction in VR by using multiple tracking devices. Before joining HIT Lab, he completed his masters degree in signal and information processing and bachelors degree in electronic information engineering from University of Electronic Science and Technology of China. During his masters period, he worked on time-frequency signal analysing and processing based on the project of Terahertz radar signal processing for heartbeat and breathing rate detection and analysing. After that, he worked for 3 years as project manager for ITS information systems integration. In his spare time, Yuanjie likes watching movies, chatting with friends, hiking and other outdoor activities.',
      educationData: [
        {
          start: '2017',
          end: 'present',
          department: 'University of Electronic and Science Technology of China',
          degreeOrJob: 'Ph.D',
          location: {
            city: 'Christchurch',
            country: 'New Zealand'
          }
        },
        {
          start: '2010',
          end: '2013',
          department: 'University of Electronic and Science Technology of China',
          degreeOrJob: 'M.E.',
          location: {
            city: 'Chengdu',
            country: 'China'
          }
        }
      ],
      experienceData: [
        {
          start: '2016',
          end: 'present',
          department: 'Dahua',
          degreeOrJob: 'Project manager',
          location: {
            city: 'Chengdu',
            country: 'China'
          }
        },
        {
          start: '2013',
          end: '2016',
          department: 'JIAO TOU',
          degreeOrJob: 'Project manager',
          location: {
            city: 'Chengdu',
            country: 'China'
          }
        }
      ]
    }
  },
  methods: {
    updateAbout (updateContent) {
      this.aboutme = updateContent
    }
  },
  async mounted () {
    try {
      const res = await ProfileService.getProfile()
      if (res.data && res.data.aboutme) {
        this.aboutme = res.data.aboutme
      }
    } catch (err) {
      if (err.response.data.errors) {
        this.$store.dispatch('setErrors', err.response.data.errors)
      }
    }
  },
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

