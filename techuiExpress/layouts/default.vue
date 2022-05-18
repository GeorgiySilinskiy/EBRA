<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list dense>
        <template v-for="item in items">
          <v-list-item :key="item.text" :to="item.to">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <span class="hidden-sm-and-down">Чат</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar> -->
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
                  <v-col cols="12" lg="4" class="boder-right">
                    <v-toolbar
                      v-if="user"
                      flat
                    >
                      <v-toolbar-title class="grey--text">
                        <v-avatar>
                          <img src="/logo_black.svg" alt="avatar">
                        </v-avatar>
                        <span>{{ user.type === 1 ? 'Менеджер' : 'Клиент' }}</span>
                        {{ user.name }}
                        <span v-if="user.online" class="online-text">{{ user.online === true ? 'Онлайн' : `был в сети ${$moment(user.online).fromNow()}` }}</span>
                        <span v-else />
                      </v-toolbar-title>
                      <div class="flex-grow-1" />
                      <v-btn icon @click.prevent="userEdit = !userEdit">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                      <v-btn icon to="/logout">
                        <v-icon>power_settings_new</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-divider />
                    <v-list v-if="dialogs && !userEdit" two-line>
                      <v-list-item-group active-class="teal--text">
                        <template v-for="item in dialogs">
                          <div :key="item.id" @click="goChat(item.id)">
                            <Dialog :dialog="item" />
                          </div>
                        </template>
                      </v-list-item-group>
                    </v-list>
                    <v-list>
                      <v-list-item-group>
                        <v-form v-if="userEdit" class="mx-10 my-10" style="text-align: center" @submit.prevent="updateUser">
                          <v-text-field
                            v-model="userName"
                            label="Имя"
                          />
                          <v-text-field
                            v-model="userEmail"
                            label="Email"
                          />
                          <v-text-field
                            v-model="userCity"
                            label="Город"
                          />
                          <v-btn type="submit" class="white--text" color="teal">
                            Обновить данные
                          </v-btn>
                        </v-form>
                      </v-list-item-group>
                    </v-list>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="8"
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
import Dialog from '~/components/Dialog.vue'
export default {
  middleware: 'noauth',
  components: {
    Dialog
  },
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
      title: 'Logo',
      userEdit: false,
      userName: '',
      userEmail: '',
      userCity: ''
    }
  },
  computed: {
    ...mapGetters({
      dialogs: 'dialogs/dialogs',
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
          this.userName = this.user.name
          this.userEmail = this.user.email
          this.userCity = this.user.city
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
      fetchDialogs: 'dialogs/fetchDialogs',
      logout: 'auth/logoutUser'
    }),
    goChat(id) {
      this.$router.push(`/chat/${id}`)
    },
    updateUser() {
      db.collection('users').doc(this.user.id).update({
        name: this.userName,
        city: this.userCity,
        email: this.userEmail
      })
      this.fetchUser()
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
