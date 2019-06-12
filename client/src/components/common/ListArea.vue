<template>
  <div id="list-area">
    <h1 class="font-weight-regular mb-4">{{title}}</h1>
    <v-list style="background: rgba(0,0,0,0)">
      <v-list-tile v-for="(item,index) in listData" :key="index">
        <v-list-tile-action>
          <v-list-tile-title class="list-icon secondary--text font-weight-bold">|</v-list-tile-title>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="detail" v-html="item"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    listData: Array
  }
}
</script>
<style scoped>
#list-area {
  padding: 2rem 0;
}
.list-icon {
  font-size: 1.6rem;
}
</style>
