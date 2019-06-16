import Api from './Api'

export default {
  getBlog() {
    return Api().get('/blog')
  },
  getBlogById(id) {
    return Api().get(`/blog/${id}`)
  },
  editBlog(params) {
    return Api().put('/blog', params)
  },
  createBlog(params) {
    return Api().post('/blog', params)
  },
  deleteBlog(id) {
    return Api().delete(`/blog/${id}`)
  },
  getCatagory() {
    return Api().get('/blog/catagory')
  },
  createCatagory(params) {
    return Api().post('/blog/catagory', params)
  },
  editCatagory(params) {
    return Api().put('/blog/catagory', params)
  },
  deleteCatagory(id) {
    return Api().delete(`/blog/catagory/${id}`)
  },
  createComment(params) {
    return Api().post('/blog/comment', params)
  },
  deleteComment(params) {
    return Api().delete(`/blog/comment/${params.blogid}/${params.commentid}`)
  }
}
