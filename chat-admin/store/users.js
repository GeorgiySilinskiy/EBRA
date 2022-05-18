
import { db } from '~/plugins/firebase.js'
class User {
  constructor(id, email = '', phone, name = '', avatar = 'https://firebasestorage.googleapis.com/v0/b/chat-4c31f.appspot.com/o/user_images%2F39DCA7F9-D903-4EDA-8AA2-57F3699A5684?alt=media&token=dce48ca9-5b3a-4b69-90a5-c60497261649', speciality, specialityId, type, about, wallet, city) {
    this.id = id
    this.email = email
    this.phone = phone
    this.name = name
    this.avatar = avatar
    this.speciality = speciality
    this.specialityId = specialityId
    this.type = type
    this.about = about
    this.wallet = wallet
    this.city = city
  }
}
export const state = () => ({
  users: null
})

export const mutations = {
  setUsers(state, payload) {
    state.users = payload
  },
  removeUsers(state) {
    state.users = null
  }
}

export const actions = {
  async fetchUsers({ commit }) {
    try {
      const users = []
      const usersInfo = await db.collection('users').get()
      usersInfo.forEach((element) => {
        const userData = element.data()
        users.push(new User(element.id, userData.email, userData.phone, userData.name, userData.profileImageUrl, userData.speciality, userData.specialityID, userData.type, userData.about, userData.wallet, userData.city))
      })
      console.log(users)
      commit('setUsers', users)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async deleteUser({ dispatch }, payload) {
    try {
      console.log(payload)
      await this.$axios.post('https://admin.ebra.ru/api/user/delete', {
        uid: payload
      })
      dispatch('fetchUsers')
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async editUser({ commit }, payload) {
    try {
      const users = []
      await db.collection('users').doc(payload.id).update({
        name: payload.name,
        city: payload.city,
        speciality: payload.spec.title,
        specialityID: payload.spec.id,
        about: payload.about
      })
      const profi = await db.collection('users').doc(payload.id).collection('profi').get()
      profi.forEach(async (element) => {
        await db.collection('users').doc(payload.id).collection('profi').doc(element.id).delete()
      })
      const spec = await db.collection('Speciality').doc(payload.spec.id).collection('services').get()
      spec.forEach(async (element) => {
        const userData = element.data()
        await db.collection('users').doc(payload.id).collection('profi').add({
          id: element.id,
          profi: userData.profi
        })
      })
      console.log(users)
      commit('setUsers', users)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}

export const getters = {
  users: state => state.users,
  usersById: state => id => state.users.find(item => item.id === id)
}
