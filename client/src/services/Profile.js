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
  },
  createeducation(params) {
    return Api().post('/profile/education', params)
  },
  deleteeducation(id) {
    return Api().delete(`/profile/education/${id}`)
  },
  createexperience(params) {
    return Api().post('/profile/experience', params)
  },
  deleteexperience(id) {
    return Api().delete(`/profile/experience/${id}`)
  },
  createinterest(params) {
    return Api().post('/profile/interests', params)
  },
  deleteinterest(id) {
    return Api().delete(`/profile/interests/${id}`)
  },
  createproject(params) {
    return Api().post('/profile/project', params)
  },
  deleteproject(id) {
    return Api().delete(`/profile/project/${id}`)
  }
}
