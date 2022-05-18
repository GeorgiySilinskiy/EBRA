const express = require('express')
const consola = require('consola')
const bodyParser = require('body-parser')
const fb = require('firebase-admin');
const { Nuxt, Builder } = require('nuxt')
const app = express()
var serviceAccount = require("./chat-4c31f-firebase-adminsdk-yahm0-0a2a45200d.json");
const firebase_tools = require('firebase-tools');
fb.initializeApp({
  credential: fb.credential.cert(serviceAccount),
  apiKey: "AIzaSyCvLLz62kZxkuTfRgAhBOq7_0VVkr2mMfY",
  authDomain: "chat-4c31f.firebaseapp.com",
  databaseURL: "https://chat-4c31f.firebaseio.com",
  projectId: "chat-4c31f",
  storageBucket: "chat-4c31f.appspot.com",
  messagingSenderId: "933822135543",
  appId: "1:933822135543:web:fd49f3777a4a6ce5"
});
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// parse application/json
app.use(bodyParser.json())

app.post('/api/user/delete', async (req, res) => {
  const uid = req.body.uid
  try {
    console.log(uid)
    // await fb.firestore().collection('users').doc(uid).delete()
    await firebase_tools.firestore.delete(`users/${uid}`, {
        project: 'chat-4c31f',
        recursive: true,
        yes: true,
        token: '1//0cTffWwrgDmePCgYIARAAGAwSNwF-L9IrWJdPJ9MkezQtiHtCzkBENMDYEexlyvsmQOhUglnM48nTVyp6K7sr_ybOUxu6ZkWLXqI'
      })
      await fb.auth().deleteUser(uid)
  } catch(e) {
    console.log(e)
    throw e
  }
})

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
