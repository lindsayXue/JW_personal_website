<template>
  <div class="view-blog">
    <div class="blog">
      <div class="blog-header lightGrey">
        <v-btn to="/blog" color="primary mr-4" dark absolute right>
          <i class="fas fa-chevron-left pr-2"></i>back
        </v-btn>
        <h1 class="tertiary--text font-weight-regular mb-4">
          {{blogData.title}}
          <v-btn
            flat
            fab
            light
            small
            color="primary"
            :to="{name: 'edit-blog', params:{id: $store.state.route.params.id}}"
          >
            <i class="fas fa-edit"></i>
          </v-btn>
          <v-btn flat fab small color="primary" @click="deleteBlog">
            <i class="fas fa-trash-alt"></i>
          </v-btn>
        </h1>
        <v-divider></v-divider>
        <div class="detail blog-info secondary--text">
          <span class="authors px-2">
            <i class="fas fa-tag pr-1"></i>
            {{blogData.catagory}}
          </span> |
          <span class="authors px-2">
            <i class="fas fa-user pr-1"></i>
            Admin
          </span> |
          <span class="date px-2">
            <i class="fas fa-calendar-alt pr-1"></i>
            <span v-if="blogData.date">{{ blogData.date | moment("MM-DD-YYYY") }}</span>
          </span>
        </div>
      </div>
      <div class="blog-content primary--text" v-html="blogData.content"></div>
    </div>
    <div class="blog-comments lightGrey">
      <h1 class="primary--text font-weight-regular mb-2">Comments</h1>
      <v-list two-line class="lightGrey">
        <template v-for="(item, index) in blogData.comments">
          <v-list-tile :key="item._id">
            <v-list-tile-content>
              <v-list-tile-title class="tertiary--text">{{item.comment}}</v-list-tile-title>
              <v-list-tile-sub-title class="detail secondary--text">
                <span class="user pr-2">
                  <i class="fas fa-user pr-1"></i>
                  {{item.user}}
                </span> |
                <span class="user pl-2">
                  <i class="fas fa-calendar-alt pr-1"></i>
                  <span v-if="blogData.date">{{ item.date | moment("MM-DD-YYYY") }}</span>
                </span>
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn flat light small fab color="primary">
                <i class="fas fa-times" @click="deleteComment(item._id)"></i>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list>
    </div>
    <div class="comment-form">
      <h1 class="tertiary--text font-weight-regular mb-2">Leave a comment</h1>
      <CommentForm v-on:updateBlog="updateBlog"/>
    </div>
  </div>
</template>
<script>
import CommentForm from './CommentForm'
import BlogService from '../../services/Blog'

export default {
  components: {
    CommentForm
  },
  data () {
    return {
      blogData: {}
    }
  },
  methods: {
    async deleteBlog () {
      try {
        await BlogService.deleteBlog(this.$store.state.route.params.id)
        this.$router.push('/blog')
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
      }
    },
    async updateBlog () {
      const res = await BlogService.getBlogById(this.$store.state.route.params.id)
      this.blogData = res.data
    },
    async deleteComment (commentid) {
      try {
        await BlogService.deleteComment({
          blogid: this.$store.state.route.params.id,
          commentid
        })
        this.updateBlog()
      } catch (err) {
        if (err.response.data.errors) {
          this.$store.dispatch('setErrors', err.response.data.errors)
        }
      }
    }
  },
  mounted () {
    this.updateBlog()
  },
}
</script>
<style scoped>
.blog-header,
.blog-content,
.blog-comments,
.comment-form {
  padding: 2rem 5vw;
}
.blog-content {
  font-size: 1.2rem;
  overflow-wrap: break-word;
  line-height: 3rem;
}
</style>
