<template>
  <div id="content-area">
    <h1 class="tertiary--text font-weight-regular mb-4 text-capitalize">{{title}}</h1>
    <v-dialog v-model="dialog" width="600" v-if="$store.state.isAdmin" persistent>
      <template v-slot:activator="{ on }">
        <v-btn color="tertiary" flat light small v-on="on">
          <i class="fas fa-edit"></i>
        </v-btn>
      </template>
      <ContentHandler v-on:closeDialog="closeDialog" :title="title" :content="content"/>
    </v-dialog>
    <div class="content primary--text" v-html="content"></div>
  </div>
</template>
<script>
import ContentHandler from '../admin/ContentHandler'

export default {
  components: {
    ContentHandler
  },
  props: ['title', 'content'],
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    closeDialog () {
      this.dialog = false
    }
  },
}
</script>
<style scoped>
.content {
  font-size: 1.2rem;
  overflow-wrap: break-word;
  line-height: 3rem;
}
</style>
