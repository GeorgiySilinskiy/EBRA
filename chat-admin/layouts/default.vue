<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/users">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Пользователи</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/promocode">
          <v-list-item-action>
            <v-icon>mdi-sale</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Промокоды</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/services">
          <v-list-item-action>
            <v-icon>mdi-alert-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Услуги</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/spec">
          <v-list-item-action>
            <v-icon>mdi-wrench</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Специализации</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item link to="/dialogs">
          <v-list-item-action>
            <v-icon>mdi-card-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Чаты</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        EBRAdmin
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { auth } from '../plugins/firebase'
import { mapActions } from 'vuex'
export default {
  middleware: 'noauth',
  data: () => ({
    drawer: false
  }),
  created() {
    auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          await this.fetchUser()
        } else {
        }
      } catch {

      }
    })
  },
  methods: {
    ...mapActions({
      fetchUser: 'auth/fetchUsers'
    })
  }
}
</script>
