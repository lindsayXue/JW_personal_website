<template>
  <div class="blog-list">
    <h1 v-if="selectedCatagory" class="secondary--text font-weight-regular">{{selectedCatagory}}</h1>
    <v-list>
      <template v-for="(item, index) in blogData">
        <v-list-tile :key="item.id" :to="{name: 'blog-view', params:{id: item.id}}">
          <v-list-tile-content>
            <v-list-tile-title class="blog-title tertiary--text">{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="item.catagory"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-content>
            <v-list-tile-sub-title v-text="item.date"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
    <v-pagination v-model="page" :length="4" circle></v-pagination>
  </div>
</template>
<script>
export default {
  props: [
    'blogData',
    'selectedCatagory'
  ],
  data () {
    return {
      page: 1
    }
  },
}
</script>
<style scoped>
.blog-list {
  padding: 1rem 5vw;
}
</style>
