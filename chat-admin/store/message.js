
import { db } from '~/plugins/firebase.js'
class Message {
  constructor(text, title, type, from, price, flag) {
    this.text = text
    this.title = title
    this.type = type
    this.from = from
    this.price = price
    this.flag = flag
  }
}
export const state = () => ({
  messages: null
})

export const mutations = {
  setMessages(state, payload) {
    state.messages = payload
  },
  removeDialogs(state) {
    state.messages = null
  }
}

export const actions = {
  async fetchMessages({ commit }, { userId, dialogId }) {
    try {
      const messages = []
      const messagesInfo = await db.collection('users').doc(userId).collection('chats').doc(userId).collection(dialogId).get()
      messagesInfo.forEach((element) => {
        const messagesData = element.data()
        messages.push(new Message(messagesData.text, messagesData.title, messagesData.type, messagesData.from, messagesData.price, messagesData.flag))
      })
      await commit('setMessages', messages)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}

export const getters = {
  messages: state => state.messages
  // usersById: state => id => state.users.find(item => item.id === id)
}
