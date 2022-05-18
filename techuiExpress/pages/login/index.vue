<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm7 md6 lg5>
      <v-card v-if="phoneInput" class="elevation-12">
        <v-toolbar color="teal" dark flat>
          <v-toolbar-title>Вход</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form ref="phone" v-model="valid" :lazy-validation="true" @submit.prevent="signIn()">
            <v-text-field
              v-model="phone"
              :counter="12"
              :loading="loading"
              label="Номер телефона"
              name="login"
              prepend-icon="phone"
              type="tel"
              :rules="phoneRules"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn to="/login/qr">
            Авторизация по qr
          </v-btn>
          <v-btn id="recaptcha-container" color="teal" :loading="loading" :disabled="!valid" @click.prevent="signIn()">
            Войти
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else class="elevation-12">
        <v-toolbar color="teal" dark flat>
          <v-toolbar-title>Код подтверждения</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form ref="code" v-model="validcode" :lazy-validation="true" @submit.prevent="signIncode()">
            <v-text-field
              v-model="code"
              :counter="6"
              :loading="loading"
              label="Введите код из SMS"
              name="login"
              prepend-icon="code"
              type="number"
              :rules="codeRules"
              required
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn id="recaptcha-container" color="primary" :loading="loading" @click.prevent="signIncode()">
            Войти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { firebase } from '~/plugins/firebase'
export default {
  layout: 'auth',
  head: {
    title: 'Авторизация по номеру телефона'
  },
  data() {
    return {
      loading: false,
      valid: false,
      appVerifier: null,
      showNumberInput: true,
      showCodeInput: false,
      phone: '',
      code: '',
      validcode: false,
      phoneInput: true,
      phoneRules: [
        v => !!v || 'ВВедите номер телефона',
        v => v.length === 12 || 'В вашем номере 12 символов, не так ли ?'
      ],
      codeRules: [
        v => !!v || 'ВВедите код подтверждения',
        v => v.length === 6 || 'Код подтверждения состоит из 6 чисел'
      ],
      recap: null
    }
  },
  mounted() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log(response)
      }
    })
    this.appVerifier = window.recaptchaVerifier
  },
  methods: {
    ...mapActions({
      signUpActions: 'auth/signUpActions',
      signUpCode: 'auth/signUpCode'
    }),
    async signIn() {
      if (this.$refs.phone.validate()) {
        const formData = {
          phone: this.phone,
          verify: this.appVerifier
        }
        await this.signUpActions(formData)
        this.phoneInput = false
      }
    },
    async signIncode() {
      if (this.$refs.code.validate()) {
        await this.signUpCode(this.code)
        this.$router.push('/chat')
      }
    }
  }
}
</script>
