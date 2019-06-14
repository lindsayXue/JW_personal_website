import Api from './Api'

export default {
  getBlog() {
    return Api().get('/blog')
  }
}
