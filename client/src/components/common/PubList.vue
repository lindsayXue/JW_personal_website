<template>
  <div class="pub-list lightGrey">
    <v-sheet class="lightGrey my-4" v-for="item in pubData" :key="item.id">
      <div class="pub-title my-2 tertiary--text">{{item.title}}</div>
      <div class="pub-type secondary white--text d-inline-block pa-1">{{item.type}}</div>
      <div class="pub-authors">{{item.authors}}</div>
      <div class="pub-info detail">{{item.info}}</div>
      <div class="pub-year">Publication year: {{item.year}}</div>
    </v-sheet>
  </div>
</template>
<script>
export default {
  props: [
    'pubData'
  ]
}
</script>
<style scoped>
.pub-list {
  padding: 1rem 5vw;
}
.pub-title {
  font-size: 1.4rem;
}
.pub-type {
  border-radius: 5px;
}
</style>
