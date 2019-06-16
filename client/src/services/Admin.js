import Api from './Api'

export default {
  login(params) {
    return Api().post('/admin/login', params)
  }
}
