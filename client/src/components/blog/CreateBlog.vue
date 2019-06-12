<template>
  <div class="create-blog">
    <vue-editor class="editor" v-model="content"></vue-editor>
    <v-btn color="primary" dark to="/blog">
      <i class="fas fa-chevron-left pr-2"></i>Back
    </v-btn>
    <v-btn color="tertiary" dark @click="create">Create</v-btn>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor"
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      content: "TEST"
    };
  },
  methods: {
    create (e) {
      e.preventDefault()
      console.log(this.content)
    }
  },
}
</script>
<style scoped>
.create-blog {
  padding: 2rem 5vw;
}
/* .editor {
  height: 300px;
} */
</style>
