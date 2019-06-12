<template>
  <div class="blog-view">
    <div class="blog-content">
      <v-btn to="/blog" color="primary mr-4" dark absolute right>
        <i class="fas fa-chevron-left pr-2"></i>back
      </v-btn>
      <h1 class="tertiary--text font-weight-regular mb-4">{{blogData.title}}</h1>
      <div class="detail secondary--text">
        {{blogData.catagory}}
        <i class="fas fa-tag pr-2"></i>
        {{blogData.author}}
        {{blogData.date}}
      </div>
      <div class="content primary--text">{{blogData.content}}</div>
    </div>
    <div class="blog-comments lightGrey">
      <h1 class="primary--text font-weight-regular mb-2">Comments</h1>
      <v-list two-line class="lightGrey">
        <v-list-tile v-for="(item, index) in blogData.comments" :key="index">
          <v-list-tile-content>
            <v-list-tile-title class="tertiary--text">{{item.content}}</v-list-tile-title>
            <v-list-tile-sub-title class="detail primary--text">{{item.user}} {{item.date}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </div>
    <div class="comment-form">
      <h1 class="tertiary--text font-weight-regular mb-2">Leave a comment</h1>
      <CommentForm/>
    </div>
  </div>
</template>
<script>
import CommentForm from './CommentForm'

export default {
  components: {
    CommentForm
  },
  data () {
    return {
      blogData: {
        title: 'Blog View Test',
        catagory: 'VR',
        author: 'Admin',
        date: '06/06/2019',
        content: 'Blog View TestBlog View TestBlog View TestBlog View TestBlog View TestBlog View TestBlog View TestBlog View TestBlog View TestBlog View TestBlog View TestBlog View TestBlog View TestBlog View Test',
        comments: [
          {
            user: 'Lindsay',
            content: 'Very good!!!',
            date: '06/06/2019'
          },
          {
            user: 'Lindsay',
            content: 'Very good!!!',
            date: '06/06/2019'
          }
        ]
      }
    }
  },
}
</script>
<style scoped>
.blog-content,
.blog-comments,
.comment-form {
  padding: 2rem 5vw;
}
.content {
  font-size: 1.2rem;
  overflow-wrap: break-word;
  line-height: 3rem;
}
</style>
