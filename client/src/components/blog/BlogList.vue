<template>
  <div class="blog-list">
    <h1 class="primary--text font-weight-regular">
      {{$store.state.route.query.catagory? $store.state.route.query.catagory : 'ALL'}}
      <i
        class="fas fa-chevron-right"
      ></i>
    </h1>
    <v-list two-line>
      <v-alert
        :value="true"
        type="error"
        class="alert my-4"
        v-if="$store.state.isAdmin && (!blogData || blogData.length === 0)"
      >No data yet!</v-alert>
      <template v-for="(item, index) in blogShow">
        <v-list-tile :key="item._id" :to="{name: 'view-blog', params:{id: item._id}}">
          <v-list-tile-content>
            <v-list-tile-title class="blog-title tertiary--text">{{item.title}}</v-list-tile-title>
            <v-list-tile-sub-title class="detail secondary--text">
              <span class="catarogy pr-2">
                <i class="fas fa-tag pr-1"></i>
                {{!item.catagory?'': item.catagory.name}}
              </span>
              |
              <span class="date pl-2">
                <i class="fas fa-calendar-alt pr-1"></i>
                {{item.date | moment("MM-DD-YYYY") }}
              </span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="index"></v-divider>
      </template>
      <v-btn color="tertiary" to="/blog/add" dark small flat v-if="$store.state.isAdmin">
        <i class="fas fa-plus"></i>
      </v-btn>
    </v-list>
    <!-- <v-pagination v-model="page" :length="pageLength" circle></v-pagination> -->
  </div>
</template>
<script>
export default {
  props: [
    'blogData',
    'searchData'
  ],
  watch: {
    '$store.state.route.query': function (val) {
      this.selectBlog(val, null)
    },
    'blogData': function () {
      this.selectBlog()
    },
    'searchData': function (val) {
      if (val) {
        this.selectBlog(null, val)
      }
    }
  },
  data () {
    return {
      blogShow: [],
      page: 1,
      itemPerPage: 20
    }
  },
  methods: {
    selectBlog (queryData, searchData) {
      this.blogShow = this.blogData
      if (queryData && !!queryData.cataId) {
        this.blogShow = this.blogData.filter(blog => blog.catagory && blog.catagory._id === queryData.cataId)
      }
      if (searchData) {
        this.blogShow = this.blogData.filter(blog => blog._id === searchData)
        this.$router.push({ query: { catagory: this.blogShow[0].catagory.name, cataId: this.blogShow[0].catagory._id } })
      }
    },
  },
  mounted () {
    this.selectBlog()
  },
}
</script>
<style scoped>
.blog-list {
  padding: 1rem 5vw;
}
</style>
