import Api from './Api'

export default {
  getProfile() {
    return Api().get('/profile')
  }
}
