// class Dialog {
//   constructor(id, text, time, type, from, badge, name) {
//     this.id = id
//     this.text = text
//     this.time = time
//     this.type = type
//     this.from = from
//     this.badge = badge
//     this.name = name
//   }
// }
export const state = () => ({
  payId: []
})

export const mutations = {
  setPayId(state, payload) {
    state.payId = payload
  }
}

export const actions = {
}

export const getters = {
  payId: state => state.payId
}
