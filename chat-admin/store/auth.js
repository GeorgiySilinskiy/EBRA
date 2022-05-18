import Cookie from 'js-cookie'
import { firebase, db, auth } from '~/plugins/firebase.js'
let result = null
class User {
  constructor(id, email, admin = false) {
    this.id = id
    this.email = email
    this.admin = admin
  }
}
export const state = () => ({
  user: null,
  token: null
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  removeUser(state) {
    state.user = null
  },
  setToken(state, payload) {
    state.token = payload
  },
  removeToken(state) {
    state.token = null
  }
}

export const actions = {
  async signUp({ commit }, formData) {
    try {
      commit('clearError', { root: true })
      commit('setLoading', true, { root: true })
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(formData.phone, formData.verify)
      result = confirmationResult
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      commit('setError', e, { root: true })
      throw e
    }
  },
  async signUpCode({ commit, dispatch }, code) {
    try {
      commit('clearError', { root: true })
      commit('setLoading', true, { root: true })
      await result.confirm(code)
      await dispatch('setUserToken')
      commit('setLoading', false, { root: true })
    } catch (e) {
      commit('setLoading', false, { root: true })
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchUsers({ commit }, payload) {
    try {
      const user = await auth.currentUser
      const uid = payload !== undefined ? payload : user.uid
      const userInfo = await db.collection('users').doc(uid).get()
      const userData = userInfo.data()
      await commit('setUser', new User(userData.uid, userData.email, userData.admin))
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async setUserToken({ commit, dispatch }) {
    try {
      commit('clearError', { root: true })
      const token = await firebase.auth().currentUser.getIdToken()
      Cookie.set('access_token', token)
      await commit('setToken', token)
      await dispatch('fetchUsers')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async logoutUser({ commit }) {
    try {
      await firebase.auth().signOut()
      await commit('removeUser')
      await commit('removeToken')
      Cookie.remove('access_token')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}

export const getters = {
  isAuth: state => Boolean(state.token),
  user: state => state.user,
  isAdmin: state => state.user ? state.user.admin : false
}
