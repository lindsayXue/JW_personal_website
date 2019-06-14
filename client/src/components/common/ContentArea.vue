<template>
  <div id="content-area">
    <h1 class="tertiary--text font-weight-regular mb-4">
      {{title.charAt(0).toUpperCase() + title.slice(1)}}
      <v-dialog v-model="dialog" width="600">
        <template v-slot:activator="{ on }">
          <v-btn color="tertiary" flat light small v-on="on">
            <i class="fas fa-edit"></i>
          </v-btn>
        </template>
        <ContentHandler
          v-on:closeDialog="closeDialog"
          :type="typeCreator()"
          v-on:updateContent="updateContent"
        />
      </v-dialog>
    </h1>
    <div class="content primary--text">{{content}}</div>
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
    },
    updateContent (newContent) {
      this.$emit('updateContent', newContent)
    },
    typeCreator () {
      if (this.title === 'about') {
        return 'aboutme'
      }
      return 'aboutresearch'
    }
  },
}
</script>
<style scoped>
.content {
  padding: 0 5vw;
  font-size: 1.2rem;
  overflow-wrap: break-word;
  line-height: 3rem;
}
</style>
