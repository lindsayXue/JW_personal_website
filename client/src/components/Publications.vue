<template>
  <div id="publications">
    <Banner class="banner" title="publications"></Banner>
    <v-layout class="search-bar mt-2" row wrap justify-space-between align-center>
      <v-flex md5 xs11>
        <v-autocomplete
          v-model="searchData"
          :items="$store.state.profile.publications"
          item-text="title"
          item-value="_id"
          label="Search..."
          clearable
        >
          <template v-slot:prepend-inner>
            <i class="fas fa-search"></i>
          </template>
          <template v-slot:no-data>
            <span class="primary--text pl-4">No pulication found</span>
          </template>
        </v-autocomplete>
      </v-flex>
    </v-layout>
    <PubList :pubData="$store.state.profile.publications" :searchData="searchData"/>
  </div>
</template>
<script>
import Banner from './common/Banner'
import PubList from './common/PubList'

export default {
  components: {
    Banner,
    PubList
  },
  data () {
    return {
      searchData: null
    }
  }
}
</script>
<style scoped>
.banner {
  background: url(../assets/pub_banner_bg.svg) center/cover no-repeat;
}
.search-bar {
  padding: 0 5vw;
}
.sort {
  font-size: 1.2rem;
}
</style>

