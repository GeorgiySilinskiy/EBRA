import { firebase, db } from '~/plugins/firebase.js'
class Dialog {
  constructor(id, text, time, type, from, badge, name, online, userType) {
    this.id = id
    this.text = text
    this.time = time
    this.type = type
    this.from = from
    this.badge = badge
    this.name = name
    this.online = online
    this.userType = userType
  }
}
export const state = () => ({
  dialogs: []
})

export const mutations = {
  updateDialog(state, payload) {
    state.dialogs.unshift(payload)
  },
  clearDialog(state, payload) {
    if (state.dialogs !== []) {
      const dialog = state.dialogs.findIndex(dialog => dialog.id === payload)
      if (dialog >= 0) {
        state.dialogs.splice(dialog, 1)
      }
    } else {
      return false
    }
  }
}

export const actions = {
  async fetchDialogs({ commit, dispatch }) {
    try {
      const user = await firebase.auth().currentUser
      // const dialogs = await db.collection('dialogs').doc(`${user.uid}`).collection('dialogs').get()
      // dialogs.docChanges().forEach(async (dialog) => {
      //   const users = await db.collection('users').doc(`${dialog.doc.id}`).get()
      //   const element = dialog.doc.data()
      //   console.log(element)
      //   commit('updateDialog', new Dialog(dialog.doc.id, element.text, element.time, element.type, element.from, element.badge, users.data().name))
      // })
      // // dialogs.forEach(async (element) => {
      // //   const user = await db.collection('users').doc(`${element.doc.id}`).get()
      // //   commit('setDialogs', new Dialog(element.id, element.text, element.time, element.type, element.from, element.badge, user.data().name))
      // // })
      await db.collection('dialogs').doc(`${user.uid}`).collection('dialogs').orderBy('time').onSnapshot((dialogs) => {
        dialogs.docChanges().forEach(async (dialog) => {
          const users = await db.collection('users').doc(`${dialog.doc.id}`).get()
          const element = dialog.doc.data()
          commit('clearDialog', dialog.doc.id)
          commit('updateDialog', new Dialog(dialog.doc.id, element.text, element.time, element.type, element.from, element.badge, users.data().name, users.data().online, users.data().type))
        })
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const getters = {
  dialogs: state => state.dialogs,
  dialogsById: state => payload => state.dialogs.find(dialog => dialog.id === payload)
}
