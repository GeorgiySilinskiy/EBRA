<template>
  <v-app>
    <v-content
      class="big-container"
    >
      <v-container
        fluid
      >
        <v-row align="center" justify="center" no-gutters>
          <v-col cols="10">
            <v-card elevation="4">
              <v-card-text class="chat-container">
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    lg="12"
                    class="message-container"
                  >
                    <nuxt />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { firebase, db } from '~/plugins/firebase.js'
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: true,
      items: [
        { icon: 'contacts', text: 'Чат', to: '/chat' },
        { icon: 'history', text: 'Документы', to: '/chat/documents' },
        { icon: 'content_copy', text: 'Выйти', to: '/logout' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Logo'
    }
  },
  computed: {
    ...mapGetters({
      dialogs: 'dialogs/dialogs',
      dialogById: 'dialogs/dialogsById',
      user: 'auth/user',
      isBreak: 'auth/isBreak'
    })
  },
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          await this.fetchUser()
          await this.fetchDialogs()
        } else {
        }
      } catch {

      }
    })
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('beforeunload', async (e) => {
        const date = Date.now()
        prompt(this.user.id, date)
        await db.collection('users').doc(`${this.user.id}`).update({
          online: date
        })
        e.preventDefault()
        return true
      }, false)
    })
  },
  methods: {
    ...mapActions({
      fetchUser: 'auth/fetchUsers',
      fetchDialogs: 'dialogs/fetchDialogs'
    }),
    goChat(id) {
      this.$router.push(`/chat/${id}`)
    }
  }
}
</script>

<style scoped>
  .theme--light.v-application{
    background: rgb(151, 151, 151);
  }
  .chat-container{
    padding: 0;
  }

  .v-list-item{
    border-bottom: 1px solid #D2D2D2;
  }
  .v-application{
    position: relative;
  }
  .v-application::before{
    content: '';
    position: absolute;
    z-index: 1;
    width: 100vw;
    height: 20vh;
    top: 0;
    background: #0191B4;
  }
  .v-application--wrap{
    z-index: 2;
  }
  .big-container{
    margin: 20px 0;
    z-index: 2;
    position: relative;
  }
  .v-list.v-sheet{
    padding: 0;
  }
  .v-card{
    overflow: hidden;
  }
  .boder-right{
    border-right: 1px solid #D2D2D2;
  }
  .message-container{
    height: calc(100vh - 65px);
    overflow: hidden;
  }
  .messages-wrap{
    height: 100%;
  }
  .messages-container{
    overflow-y: scroll;
    height: calc(100% - 135px);
  }
  .v-text-field__details{
    display: none;
  }
  .v-input__slot{
    margin: 0;
  }
::-webkit-scrollbar {
    width: 6px!important;
    height: 6px!important;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,.2);
}
</style>
