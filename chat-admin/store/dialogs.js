
import { db } from '~/plugins/firebase.js'
class Dialog {
  constructor(id) {
    this.id = id
  }
}
export const state = () => ({
  dialogs: null
})

export const mutations = {
  setDialogs(state, payload) {
    state.dialogs = payload
  },
  removeDialogs(state) {
    state.dialogs = null
  }
}

export const actions = {
  async fetchDialogsUser({ commit }, payload) {
    try {
      const dialogs = []
      const dialogInfo = await db.collection('dialogs').doc(payload).collection('dialogs').get()
      dialogInfo.forEach((element) => {
        const userData = element
        dialogs.push(new Dialog(userData.id))
      })
      await commit('setDialogs', dialogs)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}

export const getters = {
  dialogs: state => state.dialogs
  // usersById: state => id => state.users.find(item => item.id === id)
}
