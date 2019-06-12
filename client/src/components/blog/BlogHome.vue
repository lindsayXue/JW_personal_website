<template>
  <v-layout row wrap justify-center align-start>
    <v-flex lg8 md9 order-sm1 order-xs2>
      <v-layout class="search-bar mt-2 primary--text" row wrap align-start justify-space-between>
        <v-flex md7 xs11>
          <v-text-field label="Search..." v-model="searchContent" outline clearable>
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
    <v-flex lg4 md3 order-sm2 order-xs1 class="catagory tertiary">
      <h1 class="white--text font-weight-regular ma-2">Catagory</h1>
      <v-list dense class="tertiary textGrey--text">
        <template v-for="(item, index) in catagoryData">
          <v-list-tile
            :class="item === selectedCatagory? 'active-list': ''"
            @click="selectClick(item)"
            :key="index"
          >
            <v-list-tile-action>
              <v-list-tile-title class="list-icon secondary--text font-weight-bold">|</v-list-tile-title>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="content" v-html="item"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile :class="!selectedCatagory? 'active-list': ''" @click="selectClick(null)">
          <v-list-tile-action>
            <v-list-tile-title class="list-icon secondary--text font-weight-bold">|</v-list-tile-title>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="content">All</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script>
import BlogList from './BlogList'

export default {
  components: {
    BlogList
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
.active-list {
  background: var(--v-primary-base);
  color: white;
  font-weight: bold;
}
</style>
