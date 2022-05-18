import { auth } from '~/plugins/firebase.js'
export default (context) => {
  debugger
  const { store } = context
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user, store.getters.auth.usAuth)
        resolve()
      } else {
        console.log('Сучка')
      }
    })
  })
}
