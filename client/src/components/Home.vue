<template>
  <div id="home">
    <Banner class="banner" title="HOME" detail="Welcome to my personal website"></Banner>
    <ContentArea class="about" title="About" :content="content"/>
    <TimeLineArea class="lightGrey" title="Education" :timelineData="educationData"/>
    <TimeLineArea title="Experience" :timelineData="experienceData"/>
  </div>
</template>
<script>
import Banner from './common/Banner'
import ContentArea from './common/ContentArea'
import TimeLineArea from './common/timeLine/TimeLineArea'

export default {
  components: {
    Banner,
    ContentArea,
    TimeLineArea
  },
  data () {
    return {
      content: 'Yuanjie is a PhD student and his research interest is avatar mediated interaction in VR by using multiple tracking devices. Before joining HIT Lab, he completed his masters degree in signal and information processing and bachelors degree in electronic information engineering from University of Electronic Science and Technology of China. During his masters period, he worked on time-frequency signal analysing and processing based on the project of Terahertz radar signal processing for heartbeat and breathing rate detection and analysing. After that, he worked for 3 years as project manager for ITS information systems integration. In his spare time, Yuanjie likes watching movies, chatting with friends, hiking and other outdoor activities.',
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

