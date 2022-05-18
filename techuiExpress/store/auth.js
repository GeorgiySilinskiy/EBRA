import Cookie from 'js-cookie'
import { firebase, db } from '~/plugins/firebase.js'
let result = null
class User {
  constructor(id, phone, email, name, type, city) {
    this.id = id
    this.phone = phone
    this.email = email
    this.name = name
    this.type = type
    this.city = city
  }
}
class Break {
  constructor(flag = false, price = 0, title = '', uid) {
    this.flag = flag
    this.price = price
    this.title = title
    this.uid = uid
  }
}
export const state = () => ({
  user: null,
  token: null,
  break: null,
  isBreak: null
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  removeUser(state) {
    state.user = null
  },
  setisBreak(state, payload) {
    state.isBreak = payload
  },
  setBreacker(state, payload) {
    state.break = payload
  },
  setToken(state, payload) {
    state.token = payload
  },
  removeToken(state) {
    state.token = null
  }
}

export const actions = {
  async signUpActions({ commit }, formData) {
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
  fetchBreackers({ commit, state }) {
    db.collection('users').doc(`${state.user.id}`).collection('breaker').doc('breaker').onSnapshot((snapshot) => {
      if (!snapshot.data()) return
      commit('setBreacker', new Break(snapshot.data().flag, snapshot.data().price, snapshot.data().title, snapshot.data().uid))
      commit('setisBreak', snapshot.data().flag)
      Cookie.set('breacker', snapshot.data().flag)
      if (snapshot.data().flag) {
        this.$router.push('/payment')
      } else {
        this.$router.push('/chat')
      }
    })
  },
  async fetchUsers({ commit, dispatch }) {
    try {
      const user = await firebase.auth().currentUser
      const userInfo = await db.collection('users').doc(`${user.uid}`).get()
      const userData = userInfo.data()
      await commit('setUser', new User(userData.uid, user.phoneNumber, userData.email, userData.name, userData.type, userData.city))
      await dispatch('fetchBreackers')
      await db.collection('users').doc(`${user.uid}`).update({
        online: true
      })
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
  async logoutUser({ commit, state }) {
    try {
      const date = Date.now()
      await db.collection('users').doc(`${state.user.id}`).update({
        online: date
      })
      await firebase.auth().signOut()
      await commit('removeUser')
      await commit('removeToken')
      Cookie.remove('access_token')
      this.$router.push('/login')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async logoutUserQR({ commit, state }) {
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
  break: state => state.break,
  isBreak: state => state.isBreak
}
