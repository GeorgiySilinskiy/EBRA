import { db } from '~/plugins/firebase.js'
class Service {
  constructor(id, price, title, type) {
    this.id = id
    this.type = type
    this.price = price
    this.title = title
  }
}
export const state = () => ({
  accountant: null,
  lawyer: null
})

export const mutations = {
  setAcc(state, payload) {
    state.accountant = payload
  },
  setLaw(state, payload) {
    state.lawyer = payload
  }
}
export const actions = {
  async fetchService({ commit }) {
    try {
      const law = await db.collection('services').doc('lawyer').collection('lawyer').get()
      const acc = await db.collection('services').doc('accountant').collection('accountant').get()
      const accState = []
      const lawState = []
      law.forEach((element) => {
        lawState.push(new Service(element.id, element.data().price, element.data().title, 'lawyer'))
      })
      acc.forEach((element) => {
        accState.push(new Service(element.id, element.data().price, element.data().title, 'accountant'))
      })
      commit('setAcc', accState)
      commit('setLaw', lawState)
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async deleteService({ dispatch }, payload) {
    try {
      await db.collection('services').doc(payload.type).collection(payload.type).doc(payload.id).delete()
      await dispatch('fetchService')
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async addService({ dispatch }, payload) {
    try {
      await db.collection('services').doc(payload.type).collection(payload.type).add({
        title: payload.title,
        price: payload.price
      })
      await dispatch('fetchService')
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async editService({ dispatch }, payload) {
    try {
      console.log(payload)
      await db.collection('services').doc(payload.type).collection(payload.type).doc(payload.id).update({
        title: payload.title,
        price: payload.price
      })
      await dispatch('fetchService')
    } catch (e) {
      console.log(e)
      throw (e)
    }
  }
}

export const getters = {
  lawyer: state => state.lawyer,
  accountant: state => state.accountant
}
