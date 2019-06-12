<template>
  <v-layout row wrap justify-center align-start>
    <v-flex md9>
      <v-layout class="search-bar mt-2 primary--text" row wrap align-start justify-space-between>
        <v-flex md7 xs11>
          <v-text-field label="Search..." v-model="searchContent" clearable>
            <template v-slot:prepend-inner>
              <i class="fas fa-search"></i>
            </template>
          </v-text-field>
        </v-flex>
        <v-flex class="sort my-auto" md4 xs11>
          <p class="detail d-inline px-2">Sorted by Date</p>
          <i @click="sorted" class="fas fa-sort"></i>
        </v-flex>
      </v-layout>
      <BlogList :selectedCatagory="selectedCatagory" :blogData="blogShow"/>
    </v-flex>
    <v-flex md3 class="tertiary">
      <BlogCatagory
        class="catagory hidden-sm-and-down"
        :catagoryData="catagoryData"
        :selectedCatagory="selectedCatagory"
        v-on:selectClick="selectClick"
      />
    </v-flex>
  </v-layout>
</template>
<script>
import BlogList from './BlogList'
import BlogCatagory from './BlogCatagory'

export default {
  components: {
    BlogList,
    BlogCatagory
  },
  data () {
    return {
      blogData: [
        {
          id: 123,
          title: 'TEST',
          catagory: 'VR',
          content: 'hahahahahahahhhhhhhhhhhhhhhhhh',
          date: '01/06/2019'
        },
        {
          id: 2232,
          title: 'TEST',
          catagory: 'Life',
          content: 'hahahahahahahhhhhhhhhhhhhhhhhh',
          date: '01/05/2019'
        },
        {
          id: 3211,
          title: 'TEST',
          catagory: 'Test',
          content: 'hahahahahahahhhhhhhhhhhhhhhhhh',
          date: '01/02/2019'
        }
      ],
      blogShow: [],
      catagoryData: [
        'VR', 'Life', 'Test'
      ],
      selectedCatagory: null,
      searchContent: null
    }
  },
  methods: {
    selectClick (cata) {
      if (!cata) {
        this.selectedCatagory = null
        this.blogShow = this.blogData
        return
      }
      this.selectedCatagory = cata
      this.blogShow = this.blogData.filter(blog => blog.catagory === cata)
    },
    sorted () {
      this.blogShow.reverse()
    }
  },
  mounted () {
    this.blogShow = this.blogData
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
.catagory {
  height: calc(100vh - 280px);
}
</style>
