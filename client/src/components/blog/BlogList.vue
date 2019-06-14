<template>
  <div class="blog-list">
    <h1 class="primary--text font-weight-regular">
      {{selectedCatagory? selectedCatagory.name : 'ALL'}}
      <i class="fas fa-chevron-right"></i>
    </h1>
    <v-list>
      <v-alert
        :value="true"
        type="error"
        class="alert my-4"
        v-if="!blogData || blogData.length === 0"
      >No data yet!</v-alert>
      <template v-for="(item, index) in blogData">
        <v-list-tile :key="item._id" :to="{name: 'blog-view', params:{id: item._id}}">
          <v-list-tile-content>
            <v-list-tile-title class="blog-title tertiary--text">{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-content>
            <v-list-tile-sub-title>
              {{item.catagory.name}}
              <i class="fas fa-tag pl-2"></i>
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-content>
            <v-list-tile-sub-title>
              <span>{{ item.date | moment("MM-DD-YYYY") }}</span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="index"></v-divider>
      </template>
      <v-btn color="tertiary" to="/blog/add" dark small flat>
        <i class="fas fa-plus"></i>
      </v-btn>
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
      page: 1,
      itemPerPage: 20
    }
  },
}
</script>
<style scoped>
.blog-list {
  padding: 1rem 5vw;
}
</style>
