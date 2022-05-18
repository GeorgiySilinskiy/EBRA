import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCvLLz62kZxkuTfRgAhBOq7_0VVkr2mMfY',
    authDomain: 'chat-4c31f.firebaseapp.com',
    databaseURL: 'https://chat-4c31f.firebaseio.com',
    projectId: 'chat-4c31f',
    storageBucket: 'chat-4c31f.appspot.com',
    messagingSenderId: '933822135543',
    appId: '1:933822135543:web:fd49f3777a4a6ce5'
  })
}

const db = firebase.firestore()
const storage = firebase.storage()
const auth = firebase.auth()
auth.languageCode = 'ru'

export { storage, db, auth, firebase }
