const yandexCheckout = require('yandex-checkout')({ shopId: '663851', secretKey: 'live_8YpwJ8ovuoM-74NUMYXbWpXRcnrbSGTYRlJEr7cuUsw' });
const admin = require('firebase-admin');
const firebaseConfig = {
  apiKey: "AIzaSyCvLLz62kZxkuTfRgAhBOq7_0VVkr2mMfY",
  authDomain: "chat-4c31f.firebaseapp.com",
  databaseURL: "https://chat-4c31f.firebaseio.com",
  projectId: "chat-4c31f",
  storageBucket: "chat-4c31f.appspot.com",
  messagingSenderId: "933822135543",
  appId: "1:933822135543:web:fd49f3777a4a6ce5"
};
const fb = admin.initializeApp({
  credential: admin.credential.cert(require('../chat-4c31f-firebase-adminsdk-g1nk6-0c15de0c62.json')),
  apiKey: "AIzaSyCvLLz62kZxkuTfRgAhBOq7_0VVkr2mMfY",
  authDomain: "chat-4c31f.firebaseapp.com",
  databaseURL: "https://chat-4c31f.firebaseio.com",
  projectId: "chat-4c31f",
  storageBucket: "chat-4c31f.appspot.com",
  messagingSenderId: "933822135543",
  appId: "1:933822135543:web:fd49f3777a4a6ce5"
});
const db = admin.firestore();

module.exports.login = (req, res) => {
  const { id } = req.body
  db.collection('qr').doc(id).onSnapshot((Snapshot) => {
    if (Snapshot.data().uid) {
      admin.auth().createCustomToken(Snapshot.data().uid)
        .then(function(customToken) {
          res.json({
            token: customToken
          })
        })
        .catch(function(error) {
          console.log('Error creating custom token:', error);
        });
    } else {
      return
    }
  })
}

module.exports.payment = async (req, res) => {
  const { id, price } = req.body
  var idempotenceKey = id + Date.now();
  const paymentResult = await yandexCheckout.createPayment({
    'amount': {
      'value': price,
      'currency': 'RUB'
    },
    'payment_method_data': {
      'type': 'bank_card'
    },
    'confirmation': {
      'type': 'redirect',
      'return_url': 'https://ebra.ru/payment'
    }
  }, idempotenceKey)
  const payUrl = paymentResult.confirmation.confirmation_url
  const payId = paymentResult.id
  res.json({
    paymentResult: payUrl,
    payId: payId
  })
}

module.exports.checkpay = async (req, res) => {
  const { payid, id } = req.body
  const paymentResult = await yandexCheckout.getPayment(payid)
  res.json({
    paymentResult: paymentResult
  })
}
