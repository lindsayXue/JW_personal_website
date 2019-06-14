import Api from './Api'

export default {
  getProfile() {
    return Api().get('/profile')
  },
  createProfile(params) {
    return Api().post('/profile', params)
  },
  editProfile(params) {
    return Api().put('/profile', params)
  },
  editaboutme(params) {
    return Api().post('/profile/aboutme', params)
  },
  editaboutresearch(params) {
    return Api().post('/profile/aboutresearch', params)
  }
}
