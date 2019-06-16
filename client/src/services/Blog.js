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
  }
}
