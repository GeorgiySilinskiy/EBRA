import { db } from '~/plugins/firebase.js'
class Promocode {
  constructor(id, value, code) {
    this.id = id
    this.value = value
    this.code = code
  }
}
export const state = () => ({
  promocodes: null
})

export const mutations = {
  setPromo(state, payload) {
    state.promocodes = payload
  },
  clearPromo(state) {
    state.promocodes = null
  }
}
export const actions = {
  async fetchPromo({ commit }) {
    try {
      const promocodes = await db.collection('promoCodes').get()
      const promoState = []
      promocodes.forEach((element) => {
        promoState.push(new Promocode(element.id, element.data().value, element.data().code))
      })
      commit('setPromo', promoState)
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async deletePromo({ dispatch }, payload) {
    try {
      await db.collection('promoCodes').doc(payload).delete()
      await dispatch('fetchPromo')
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async addPromo({ dispatch }, payload) {
    try {
      await db.collection('promoCodes').add(payload)
      await dispatch('fetchPromo')
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async editPromo({ dispatch }, payload) {
    try {
      console.log(payload)
      await db.collection('promoCodes').doc(payload.id).update({
        code: payload.code,
        value: payload.value
      })
      await dispatch('fetchPromo')
    } catch (e) {
      console.log(e)
      throw (e)
    }
  }
}

export const getters = {
  promocodes: state => state.promocodes
}
