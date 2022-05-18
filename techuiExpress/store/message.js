import { db, storage } from '~/plugins/firebase.js'
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
  async sendMessage({ commit, getters }, payload) {
    try {
      const messageFrom = {
        text: payload.text,
        time: Date.now()
      }
      const dialogsSenter = await db.collection('dialogs').doc(payload.senderId).collection('dialogs').doc(payload.userId).get()
      const badge = dialogsSenter.data().badge
      // Отправка сообщений себе
      await db.collection('users').doc(payload.userId).collection('chats').doc(payload.userId).collection(payload.senderId).add({
        ...messageFrom,
        from: 0,
        type: 0
      })
      await db.collection('dialogs').doc(payload.userId).collection('dialogs').doc(payload.senderId).set({
        ...messageFrom,
        from: 0,
        type: 0,
        badge: 0
      })
      // Отправка сообщений Другому пиздюку
      await db.collection('users').doc(payload.senderId).collection('chats').doc(payload.senderId).collection(payload.userId).add({
        ...messageFrom,
        from: 1,
        type: 0
      })
      await db.collection('dialogs').doc(payload.senderId).collection('dialogs').doc(payload.userId).set({
        ...messageFrom,
        from: 1,
        type: 0,
        badge: badge + 1
      })
      await db.collection('notifications').doc(payload.senderId).collection('notify').add({
        title: payload.userName,
        body: payload.text,
        type: 0
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async sendFile({ commit, getters }, payload) {
    try {
      const messageFrom = {
        title: payload.title,
        type: payload.type,
        time: Date.now()
      }
      console.log(payload.title)
      const dialogsSenter = await db.collection('dialogs').doc(payload.senderId).collection('dialogs').doc(payload.userId).get()
      const badge = dialogsSenter.data().badge
      // Создание изображения
      const file = await storage.ref(`/${payload.type === 3 ? 'docs' : 'images'}/${payload.userId}/${payload.title}`).put(payload.file)
      const fileLink = await file.ref.getDownloadURL()
      // Отправка сообщений себе
      await db.collection('users').doc(payload.userId).collection('chats').doc(payload.userId).collection(payload.senderId).add({
        ...messageFrom,
        from: 0,
        text: fileLink
      })
      await db.collection('dialogs').doc(payload.userId).collection('dialogs').doc(payload.senderId).set({
        ...messageFrom,
        from: 0,
        badge: 0,
        text: fileLink
      })
      await db.collection('users').doc(payload.userId).collection('attachments').doc(payload.userId).collection(payload.senderId).add({
        ...messageFrom,
        from: 0,
        text: fileLink
      })
      // Отправка сообщений Другому пиздюку
      await db.collection('users').doc(payload.senderId).collection('chats').doc(payload.senderId).collection(payload.userId).add({
        ...messageFrom,
        from: 1,
        text: fileLink
      })
      await db.collection('users').doc(payload.senderId).collection('attachments').doc(payload.senderId).collection(payload.userId).add({
        ...messageFrom,
        from: 1,
        text: fileLink
      })
      await db.collection('dialogs').doc(payload.senderId).collection('dialogs').doc(payload.userId).set({
        ...messageFrom,
        from: 1,
        badge: badge + 1,
        text: fileLink
      })
      await db.collection('notifications').doc(payload.senderId).collection('notify').add({
        title: payload,
        body: payload.title,
        type: payload.type
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  },
  async addPay({ commit, getters }, payload) {
    try {
      const messageFrom = {
        text: payload.text,
        time: payload.time,
        price: payload.price,
        break: true,
        flag: true,
        from: payload.from,
        type: payload.type
      }
      const dialogsSenter = await db.collection('dialogs').doc(payload.senderId).collection('dialogs').doc(payload.userId).get()
      const badge = dialogsSenter.data().badge
      // Отправка сообщений себе
      await db.collection('users').doc(payload.userId).collection('chats').doc(payload.userId).collection(payload.senderId).add({
        ...messageFrom
      })
      await db.collection('dialogs').doc(payload.userId).collection('dialogs').doc(payload.senderId).set({
        ...messageFrom,
        badge: 0
      })
      // Отправка сообщений Другому пиздюку
      await db.collection('users').doc(payload.senderId).collection('chats').doc(payload.senderId).collection(payload.userId).add({
        ...messageFrom
      })
      await db.collection('dialogs').doc(payload.senderId).collection('dialogs').doc(payload.userId).set({
        ...messageFrom,
        badge: badge + 1
      })
      await db.collection('notifications').doc(payload.senderId).collection('notify').add({
        title: payload.userName,
        body: payload.text,
        type: 4
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const getters = {
  dialogs: state => state.dialogs
}
