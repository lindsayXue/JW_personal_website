<template>
  <v-layout row wrap justify-center align-start>
    <v-flex md9>
      <v-layout class="search-bar mt-2 primary--text" row wrap align-start justify-space-between>
        <v-flex md7 xs11>
          <v-autocomplete
            v-model="searchData"
            :items="blogData"
            item-text="title"
            item-value="_id"
            label="Search..."
            clearable
          >
            <template v-slot:prepend-inner>
              <i class="fas fa-search"></i>
            </template>
            <template v-slot:no-data>
              <span class="primary--text pl-4">No blog found</span>
            </template>
          </v-autocomplete>
        </v-flex>
        <v-flex class="sort my-auto" md4 xs11>
          <p class="detail d-inline px-2">Sorted by Date</p>
          <i @click="sorted" class="fas fa-sort"></i>
        </v-flex>
        <v-progress-linear v-if="isLoading" :indeterminate="true" color="secondary" height="3"></v-progress-linear>
      </v-layout>

      <BlogList :blogData="blogData" :searchData="searchData"/>
    </v-flex>
    <v-flex textGrey md3 xs11 order-sm1>
      <BlogCatagory class="catagory" :catagoryData="catagoryData" v-on:updateBlog="updateBlog"/>
    </v-flex>
  </v-layout>
</template>
<script>
import BlogList from './BlogList'
import BlogCatagory from './BlogCatagory'
import BlogService from '../../services/Blog'

export default {
  components: {
    BlogList,
    BlogCatagory
  },
  data () {
    return {
      blogData: [],
      catagoryData: [],
      searchData: null,
      isLoading: false
    }
  },
  methods: {
    sorted () {
      this.blogData.reverse()
    },
    async updateBlog () {
      this.isLoading = true
      try {
        const resBlog = await BlogService.getBlog()
        this.blogData = resBlog.data
        const resCatagory = await BlogService.getCatagory()
        this.catagoryData = resCatagory.data
        this.isLoading = false
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
        this.isLoading = false
      }
    }
  },
  mounted () {
    this.updateBlog()
  },
}
</script>
<style scoped>
.search-bar {
  padding: 0 5vw;
}
.sort {
  font-size: 1.2rem;
}
</style>
