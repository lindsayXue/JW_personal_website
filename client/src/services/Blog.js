import Api from './Api'

export default {
  getBlog() {
    return Api().get('/blog')
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
