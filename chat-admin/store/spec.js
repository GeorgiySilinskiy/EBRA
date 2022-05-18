import { db } from '~/plugins/firebase.js'
class Spec {
  constructor(id, title) {
    this.id = id
    this.title = title
  }
}
class SpecItem {
  constructor(id, title) {
    this.id = id
    this.title = title
  }
}
export const state = () => ({
  specCat: null,
  specCatItems: null
})

export const mutations = {
  setCat(state, payload) {
    state.specCat = payload
  },
  setCatItems(state, payload) {
    state.specCatItems = payload
  }
}
export const actions = {
  async fetchSpecCat({ commit }) {
    try {
      const promocodes = await db.collection('Speciality').get()
      const promoState = []
      promocodes.forEach((element) => {
        promoState.push(new Spec(element.id, element.data().speciality))
      })
      commit('setCat', promoState)
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async deleteSpec({ dispatch }, payload) {
    try {
      await db.collection('Speciality').doc(payload).delete()
      await dispatch('fetchSpecCat')
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async addSpecCat({ dispatch }, payload) {
    try {
      const added = await db.collection('Speciality').add({
        speciality: payload.title
      })
      db.collection('Speciality').doc(added.id).update({
        id: added.id
      })
      await dispatch('fetchSpecCat')
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async editSpec({ dispatch }, payload) {
    try {
      console.log(payload)
      await db.collection('Speciality').doc(payload.id).update({
        speciality: payload.title
      })
      await dispatch('fetchSpecCat')
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async fetchSpecCatItem({ commit }, payload) {
    try {
      const promocodes = await db.collection('Speciality').doc(payload).collection('services').get()
      const promoState = []
      promocodes.forEach((element) => {
        promoState.push(new SpecItem(element.id, element.data().profi))
      })
      commit('setCatItems', promoState)
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async deleteSpecItem({ dispatch }, payload) {
    try {
      await await db.collection('Speciality').doc(payload.specId).collection('services').doc(payload.id).delete()
      await dispatch('fetchSpecCatItem', payload.specId)
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async addSpecCatItem({ dispatch }, payload) {
    try {
      await db.collection('Speciality').doc(payload.specId).collection('services').add({
        profi: payload.title
      })
      await dispatch('fetchSpecCatItem', payload.specId)
    } catch (e) {
      console.log(e)
      throw (e)
    }
  },
  async editSpecItem({ dispatch }, payload) {
    try {
      console.log(payload)
      await db.collection('Speciality').doc(payload.specId).collection('services').doc(payload.id).update({
        profi: payload.title
      })
      await dispatch('fetchSpecCatItem', payload.specId)
    } catch (e) {
      console.log(e)
      throw (e)
    }
  }

}

export const getters = {
  specCat: state => state.specCat,
  specCatItems: state => state.specCatItems
}
