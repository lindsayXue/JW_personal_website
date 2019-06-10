<template>
  <div id="content-area">
    <h1 class="tertiary--text font-weight-regular mb-4">{{title}}</h1>
    <div class="content primary--text">{{content}}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    content: String
  }
}
</script>
<style scoped>
/* #text-area {
  padding: 2rem 5vw;
} */
.content {
  padding: 0 5vw;
  font-size: 1.2rem;
  overflow-wrap: break-word;
  line-height: 3rem;
}
</style>
