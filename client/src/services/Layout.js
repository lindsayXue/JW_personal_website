import Api from './Api'

export default {
  getLayout() {
    return Api().get('/layout')
  },
  edithomeDesc(params) {
    return Api().post('/layout/home', params)
  },
  editresearchDesc(params) {
    return Api().post('/layout/research', params)
  },
  editpublicationsDesc(params) {
    return Api().post('/layout/publications', params)
  },
  editblogDesc(params) {
    return Api().post('/layout/blog', params)
  },
  editcontactDesc(params) {
    return Api().post('/layout/contact', params)
  },
  editFooter(params) {
    return Api().post('/layout/footer', params)
  },
  editContactImg(params) {
    return Api().post('/layout/contactImg', params)
  }
}
