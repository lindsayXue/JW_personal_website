<template>
  <div class="create-blog">
    <v-card>
      <v-card-title class="headline tertiary white--text" primary-title>Blog</v-card-title>
      <v-card-text>
        <v-alert
          :value="true"
          type="error"
          v-if="!!$store.state.errors.server"
        >{{$store.state.errors.server.msg}}</v-alert>
        <v-form ref="form">
          <v-container>
            <v-layout wrap>
              <v-flex xs11 class="text-xs-center">
                <v-progress-circular v-if="isLoading" :width="3" color="secondary" indeterminate></v-progress-circular>
              </v-flex>
              <v-flex xs11>
                <v-text-field
                  v-model="title"
                  :error="!!$store.state.errors.blogTitle"
                  :error-messages="$store.state.errors.blogTitle? $store.state.errors.blogTitle.msg  : ''"
                  :disabled="isLoading"
                  label="Title"
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex sm5 xs11>
                <v-select
                  :items="blogCatagory"
                  item-value="_id"
                  item-text="name"
                  v-model="catagory"
                  :error="!!$store.state.errors.blogCatagory"
                  :error-messages="$store.state.errors.blogCatagory? $store.state.errors.blogCatagory.msg  : ''"
                  :disabled="isLoading"
                  label="Blog catagory"
                  clearable
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
        <vue-editor class="editor" v-model="content" :disabled="isLoading"></vue-editor>
        <v-alert
          :value="true"
          type="error"
          dismissible
          v-if="!!$store.state.errors.blogContent"
        >{{$store.state.errors.blogContent.msg}}</v-alert>
        <v-btn color="primary" dark to="/blog">
          <i class="fas fa-chevron-left pr-2"></i>Back
        </v-btn>
        <v-btn color="tertiary" dark @click="createBlog">Create</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor"
import BlogService from '../../services/Blog'

export default {
  components: {
    VueEditor
  },
  data () {
    return {
      title: '',
      content: '',
      catagory: '',
      blogCatagory: [],
      isLoading: true
    };
  },
  methods: {
    async createBlog () {
      this.isLoading = true
      this.$store.dispatch('setErrors', null)
      try {
        const res = await BlogService.createBlog({
          blogTitle: this.title,
          blogCatagory: this.catagory,
          blogContent: this.content
        })
        this.isLoading = false
        this.$router.push({
          name: 'view-blog',
          params: {
            id: res.data._id
          }
        })
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
        this.isLoading = false
      }
    }
  },
  async mounted () {
    if (!this.$store.state.isAdmin) {
      this.$router.push('/blog')
      return
    }
    try {
      const res = await BlogService.getCatagory()
      this.blogCatagory = res.data
      this.isLoading = false
    } catch (err) {
      if (err.response.data.errors) {
        this.$store.dispatch('setErrors', err.response.data.errors)
      }
      this.isLoading = false
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
