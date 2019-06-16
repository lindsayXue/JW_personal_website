<template>
  <div class="content-handler">
    <v-card>
      <v-card-title class="headline tertiary white--text" primary-title>Content</v-card-title>
      <v-card-text>
        <v-alert
          :value="true"
          type="error"
          v-if="!!$store.state.errors.server"
        >{{$store.state.errors.server.msg}}</v-alert>

        <div class="edit-content">
          <vue-editor class="editor" v-model="contentEdit"></vue-editor>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="close">Back</v-btn>
        <v-btn color="tertiary" flat @click="edit">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import ProfileService from '../../services/Profile'
import { VueEditor } from "vue2-editor"

export default {
  props: ['title', 'content'],
  components: {
    VueEditor
  },
  data () {
    return {
      contentEdit: '',
      isLoading: false
    }
  },
  watch: {
    content: function (val) {
      this.contentEdit = val
    }
  },
  methods: {
    async edit () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      let serviceName = null
      if (!this.title) {
        serviceName = `editresearch`
      } else {
        serviceName = `edit${this.title}`
      }
      try {
        await ProfileService[serviceName]({
          content: this.contentEdit
        })
        await this.$store.dispatch('getProfile')
        this.contentEdit = this.content
        this.isLoading = false
        this.$emit('closeDialog')
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
        this.isLoading = false
      }
    },
    close () {
      this.$emit('closeDialog')
      this.$store.dispatch('setErrors', null)
      this.contentEdit = this.content
      this.isLoading = false
    },
  },
  mounted () {
    this.contentEdit = this.content
  },
}
</script>
<style scoped>
</style>

