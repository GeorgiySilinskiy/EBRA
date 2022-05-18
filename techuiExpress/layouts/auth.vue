<template>
  <v-app dark>
    <v-content>
      <v-container fluid class="fill-height">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import { firebase } from '~/plugins/firebase.js'
export default {
  middleware: 'auth',
  async mounted() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        this.fetchUser()
      } else {
      }
    })
  },
  methods: {
    ...mapActions({
      fetchUser: 'auth/setUserToken'
    })
  }
}
</script>
