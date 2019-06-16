import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import ProfileService from '../services/Profile'
import AdminService from '../services/Admin'

import setAuthToken from '../services/setAuthToken'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState()],
  state: {
    profile: {},
    isAdmin: false,
    errors: {}
  },
  mutations: {
    setProfile: (state, profile) => {
      state.profile = profile
    },
    setAdmin: (state, isAdmin) => {
      state.isAdmin = isAdmin
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
    },
    loginAdmin: async ({ commit }, params) => {
      try {
        const res = await AdminService.login(params)
        setAuthToken(res.data.token)
        commit('setAdmin', true)
      } catch (err) {
        commit('setErrors', err.response.data.errors)
      }
    },
    setAdmin: ({ commit }, isAdmin) => {
      commit('setAdmin', isAdmin)
    },
    logoutAdmin: ({ commit }) => {
      setAuthToken()
      commit('setAdmin', false)
    }
  }
})
