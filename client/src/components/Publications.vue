<template>
  <div id="publications">
    <Banner class="banner" title="PUBLICATIONS" detail="Key publications"></Banner>
    <v-layout class="search-bar mt-2" row justify-space-around align-center>
      <v-flex class="md4 xs6">
        <v-text-field label="Search..." v-model="searchContent" outline clearable>
          <template v-slot:prepend-inner>
            <i class="fas fa-search"></i>
          </template>
        </v-text-field>
      </v-flex>
      <v-flex class="sort md4 xs6">
        <p class="d-inline px-2">Sorted by Year</p>
        <i class="fas fa-sort"></i>
      </v-flex>
    </v-layout>
    <PubList :pubData="pubData"/>
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
      pubData: [
        {
          id: 1,
          title: "TEST HAHAHA",
          authors: 'Yuanjie Wu',
          type: 'Conference',
          year: '2019',
          info: 'Test test'
        },
        {
          id: 2,
          title: "TEST HAHAHA",
          authors: 'Yuanjie Wu',
          type: 'Conference',
          year: '2019',
          info: 'Test test'
        },
        {
          id: 3,
          title: "TEST HAHAHA",
          authors: 'Yuanjie Wu',
          type: 'Conference',
          year: '2019',
          info: 'Test test'
        }
      ],
      searchContent: null
    }
  },
}
</script>
<style scoped>
.banner {
  background: url(../assets/pub_banner_bg.svg) center/cover no-repeat;
}
.sort {
  font-size: 1.2rem;
}
</style>

