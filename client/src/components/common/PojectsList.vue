<template>
  <div id="projects-list">
    <h1 class="primary--text font-weight-regular mb-4">{{title}}</h1>
    <div class="list-content">
      <v-card class="mb-4" v-for="(item, index) in projectsData" :key="index" hover>
        <v-layout>
          <v-flex xs4>
            <v-img class="secondary" height="250" width="250" contain>Project image</v-img>
          </v-flex>
          <v-flex xs7>
            <v-card-title primary-title>
              <div>
                <div class="headline tertiary--text">{{item.name}}</div>
              </div>
            </v-card-title>
            <v-card-text class="detail">{{item.detail}}</v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    projectsData: Array
  }
}
</script>
<style scoped>
#projects-list {
  padding: 2rem 5vw;
}
.list-content {
  padding: 0 5vw;
}
</style>
