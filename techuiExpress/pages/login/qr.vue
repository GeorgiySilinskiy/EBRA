<template>
  <v-layout align-center justify-center>
    <v-flex
      class="qr-container"
      xs12
      sm7
      md6
      lg5
      elevation="2"
    >
      <v-col lg="12">
        <qriously class="qr" :value="val" :size="300" />
      </v-col>

      <p class="qr-text">
        Чтобы использовать Chat на вашем компьютере необходимо: <br>
        1. Открыть приложение на вашем телефоне  <br>
        2. Кликнуть на QR Scanner  <br>
        3. Отсканировать данный QR Code  <br>
      </p>
      <v-btn color="teal" style="color: #fff" to="/login">
        Авторизоваться по номеру телефона
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { db, auth } from '~/plugins/firebase'
export default {
  layout: 'auth',
  head: {
    title: 'Авторизация по QR коду'
  },
  data() {
    return {
      val: ''
    }
  },
  async mounted() {
    try {
      await this.logoutUser()
      const id = await db.collection('qr').add({
        uid: ''
      })
      console.log(id)
      this.val = id.id
      const result = await this.$axios.post(`${window.location.origin}/api/login`, {
        id: id.id
      })
      await auth.signInWithCustomToken(result.data.token)
      this.setUserToken()
      this.$router.push('/chat')
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    ...mapActions({
      setUserToken: 'auth/setUserToken',
      logoutUser: 'auth/logoutUserQR'
    })
  }
}

</script>

<style lang="scss" scoped>
  .qr{
    margin: auto;
    width: 300px;
  }
  .qr-container{
    background: #fff;
    border-radius: 10px;
    text-align: center;
    padding: 45px
  }
  .layout::after{
    content: '';
    position: fixed;
    z-index: 1;
    width: 100vw;
    height: 30vh;
    top: 0;
    background: #0191B4;
  }
  .qr-text{
    text-align: center;
    line-height: 40px;
    margin-top: 30px;
  }
  .flex{
    position: relative;
    z-index: 4;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)!important;
  }
</style>
