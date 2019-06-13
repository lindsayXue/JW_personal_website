import Vue from 'vue'
import Vuex from 'vuex'

import ProfileService from '../services/Profile'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    profile: null,
    isAdmin: false,
    errors: {}
  },
  mutations: {
    setProfile: (state, profile) => {
      state.profile = profile
    },
    setAdmin: (state, admin) => {
      if (!admin) {
        return (state.isAdmin = false)
      }
      state.isAdmin = true
    },
    setErrors: (state, errors) => {
      state.errors = errors
    }
  },
  actions: {
    getProfile: async ({ commit }) => {
      try {
        const res = await ProfileService.getProfile()
        commit('setProfile', res.data)
      } catch (err) {
        commit('setErrors', err.response.data)
      }
    },
    editProfile: async ({ commit }, newProfile) => {
      try {
        commit('setProfile', newProfile)
      } catch (err) {
        commit('setErrors', err.response.data)
      }
    }
  }
})
