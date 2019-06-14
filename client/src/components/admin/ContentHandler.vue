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
          <vue-editor class="editor" v-model="content"></vue-editor>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="closeEdit">Back</v-btn>
        <v-btn color="tertiary" flat @click="editContent">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import ProfileService from '../../services/Profile'
import { VueEditor } from "vue2-editor"

export default {
  props: ['type'],
  components: {
    VueEditor
  },
  data () {
    return {
      content: '',
      isLoading: true
    }
  },
  methods: {
    async editContent () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        await ProfileService[`edit${this.type}`]({
          content: this.content
        })
        await this.$store.dispatch('getProfile')
        this.$emit('updateContent', this.content)
        this.isLoading = false
        this.$emit('closeDialog')
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
        this.isLoading = false
      }
    },
    async closeEdit () {
      this.$emit('closeDialog')
      this.$store.dispatch('setErrors', null)
      try {
        const res = await ProfileService.getProfile()
        if (res.data && res.data[this.type]) {
          this.content = res.data[this.type]
        } else {
          this.content = ''
        }
        this.isLoading = false
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
        this.isLoading = false
      }
    },
  },
  async mounted () {
    try {
      const res = await ProfileService.getProfile()
      if (res.data && res.data[this.type]) {
        this.content = res.data[this.type]
      }
      this.isLoading = false
    } catch (err) {
      if (err.response.data.errors) {
        this.$store.dispatch('setErrors', err.response.data.errors)
      }
    }
  },
}
</script>
<style scoped>
</style>

