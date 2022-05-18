<template>
  <v-layout align-center justify-center style="height: 100%; text-align: center">
    <v-flex xs12 sm7 md6 lg5 style="background: #fff; color:#000;">
      <h1 class="font-weight-black display-2">
        ОПЛАТИТЕ СЧЕТ
      </h1>
      <p>Для продолжения требуется оплатить оказанные услуги</p>
      <p v-if="paymentResult">
        {{ paymentResult }}
      </p>
      <p v-if="breaker">
        Услуга: {{ breaker.title }} <br>
        Стоимость услуги: {{ breaker.price }} ₽
      </p>
      <v-btn v-if="!payId" color="teal" @click.prevent="pay">
        Оплатить
      </v-btn>
      <v-btn v-else class="mx-2 white--text" color="teal" @click.prevent="checkPay">
        Проверить оплату
      </v-btn>
      <v-btn v-if="payId" class="mx-2" color="teal" outlined @click.prevent="pay">
        Повторить оплату
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
// import { mapActions } from 'vuex'
import Cookie from 'js-cookie'
import { mapGetters, mapActions } from 'vuex'
import { auth, db } from '~/plugins/firebase'
export default {
  layout: 'payment',
  head: {
    title: 'Вам выставили счет, для продолжения требуется оплатить'
  },
  data() {
    return {
      val: '',
      result: null,
      paymentResult: null
    }
  },
  computed: {
    ...mapGetters({
      payId: 'payment/payId',
      user: 'auth/user',
      breaker: 'auth/break',
      isBreak: 'auth/isBreak'
    })
  },
  created() {
    setTimeout(() => {
      if (!this.isBreak) {
        this.$router.push('/chat')
      }
    }, 2000)
    auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          await this.fetchUser()
          this.checkPay()
        } else {
        }
      } catch {

      }
    })
  },
  methods: {
    ...mapActions({
      fetchUser: 'auth/fetchUsers'
    }),
    async pay() {
      console.log('pay', this.user)
      const result = await this.$axios.post(`${window.location.origin}/api/pay`, {
        id: this.user.id,
        price: this.breaker.price
      })
      Cookie.set('pay_id', result.data.payId)
      this.result = result
      window.open(result.data.paymentResult)
      console.log(result)
    },
    async checkPay() {
      const paymentResult = await this.$axios.post(`${window.location.origin}/api/checkpay`, {
        payid: this.payId,
        id: this.user.id
      })
      if (paymentResult.data.paymentResult.status === 'succeeded') {
        const messageIdto = await db.collection('users').doc(this.user.id).collection('chats').doc(this.user.id).collection(this.breaker.uid).where('type', '==', 4).get()
        const messageIdfrom = await db.collection('users').doc(this.breaker.uid).collection('chats').doc(this.breaker.uid).collection(this.user.id).where('type', '==', 4).get()
        let mbreaker = ''
        let tbreaker = ''
        messageIdto.docs.forEach((element) => {
          mbreaker = element.id
        })
        messageIdfrom.docs.forEach((element) => {
          tbreaker = element.id
        })
        console.log(mbreaker, tbreaker)
        db.collection('users').doc(this.user.id).collection('breaker').doc('breaker').update({
          flag: false
        })
        db.collection('users').doc(this.user.id).collection('chats').doc(this.user.id).collection(this.breaker.uid).doc(mbreaker).update({
          flag: false,
          break: false
        })
        db.collection('users').doc(this.breaker.uid).collection('chats').doc(this.breaker.uid).collection(this.user.id).doc(tbreaker).update({
          flag: false,
          break: false
        })
      } else if (paymentResult.data.paymentResult.status === 'canceled') {
        this.paymentResult = 'Платеж отменен'
        Cookie.remove('pay_id')
      } else if (paymentResult.data.paymentResult.status === 'pending') {
        this.paymentResult = 'Ожидание платежа'
      }
    }
  }
}

</script>
