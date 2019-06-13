import Vue from 'vue'
import Vuex from 'vuex'

import ProfileService from '../services/Profile'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    profile: {},
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
      if (!errors) {
        return (state.errors = {})
      }
      state.errors = errors
    }
  },
  actions: {
    getProfile: async ({ commit }) => {
      try {
        const res = await ProfileService.getProfile()
        commit('setProfile', res.data)
      } catch (err) {
        commit('setErrors', err.response.data.errors)
      }
    },
    createProfile: async ({ commit }, newProfile) => {
      try {
        const res = await ProfileService.createProfile(newProfile)
        commit('setProfile', res.data)
      } catch (err) {
        commit('setErrors', err.response.data.errors)
      }
    },
    editProfile: async ({ commit }, newProfile) => {
      try {
        await ProfileService.editProfile(newProfile)
        commit('setProfile', newProfile)
      } catch (err) {
        commit('setErrors', err.response.data.errors)
      }
    },
    setErrors: ({ commit }, errors) => {
      commit('setErrors', errors)
    }
  }
})
