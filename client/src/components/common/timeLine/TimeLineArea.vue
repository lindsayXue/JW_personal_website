<template>
  <div id="timeline-area">
    <h1 class="tertiary--text font-weight-regular mb-4">{{title}}</h1>
    <div class="content primary--text">
      <TimeLineContent v-for="(item,index) in timelineData" :key="index" :item="item"/>
    </div>
  </div>
</template>
<script>
import TimeLineContent from './TimeLineContent'

export default {
  components: {
    TimeLineContent
  },
  props: {
    title: String,
    timelineData: Array
  }
}
</script>
<style scoped>
#timeline-area {
  padding: 2rem 5vw;
}
.content {
  padding: 0 5vw;
  font-size: 1.2rem;
  line-height: 1.5rem;
}
</style>
