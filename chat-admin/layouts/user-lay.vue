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
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        EBRAdmin
      </v-toolbar-title>
    </v-app-bar>

    <v-content v-if="user">
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="start">
          <v-col cols="12" sm="4" class="profile">
            <v-card class="mx-auto">
              <v-img contain class="white--text align-start" height="200px" :src="user.avatar">
                <v-btn class="mx-4 my-4" fab link color="grey lighten-5" to="/users">
                  <v-icon dark>mdi-arrow-left</v-icon>
                </v-btn>
                <v-btn
                  class="mx-4 my-4"
                  fab
                  small
                  dark
                  color="indigo lighten-1"
                  @click="addSheet = true"
                >
                  <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  class="mx-4 my-4"
                  fab
                  small
                  dark
                  color="deep-orange darken-2"
                  @click="deleteSheet = true"
                >
                  <v-icon dark>mdi-delete-outline</v-icon>
                </v-btn>
              </v-img>
              <v-card-title>{{ user.name }}</v-card-title>
              <v-card-subtitle class="pb-0" v-if="user.type === 0">Пользователь</v-card-subtitle>
              <v-card-subtitle class="pb-0" v-else-if="user.type === 1">Менеджер:
                {{ user.post === 0 ? 'Юрист' : 'Бухгалтер' }}</v-card-subtitle>
              <v-card-text class="text--primary">
                {{ user.about }}
              </v-card-text>
              <v-list dense>
                <v-list-item-group color="primary">
                  <v-list-item v-if="user.phone" inactive>
                    <v-list-item-icon>
                      <v-icon>mdi-phone</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ user.phone }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="user.email" inactive>
                    <v-list-item-icon>
                      <v-icon>mdi-email</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ user.email }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="user.speciality" inactive>
                    <v-list-item-icon>
                      <v-icon>mdi-briefcase</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ user.speciality }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="user.speciality" inactive>
                    <v-list-item-icon>
                      <v-icon>mdi-briefcase-search</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ user.specialityId }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="user.wallet" inactive>
                    <v-list-item-icon>
                      <v-icon>mdi-wallet</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ user.wallet }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="user.city" inactive>
                    <v-list-item-icon>
                      <v-icon>mdi-city</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ user.city }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8">
            <nuxt />
          </v-col>
        </v-row>
                <v-bottom-sheet v-model="deleteSheet" persistent>
          <v-sheet class="text-center">
            <v-btn class="mt-6" color="green" @click="deleteSheet = !deleteSheet">Отменить</v-btn>
            <v-btn class="mt-6" color="deep-orange darken-2" @click="deleteUser(user.id);deleteSheet = !deleteSheet;this.$route.push('/users')">Подтвердить удаление</v-btn>
          </v-sheet>
        </v-bottom-sheet>
        <v-bottom-sheet v-model="addSheet" persistent>
          <v-sheet class="text-center">
            <v-btn class="mt-6" color="error" @click="addSheet = !addSheet">Закрыть</v-btn>
            <v-form @submit.prevent="editUser(edit); addSheet = !addSheet">
              <v-container>
                <v-row justify="center">
                  <v-col cols="12" md="4">
                    <v-text-field v-model="edit.name" label="Имя" required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="edit.city" label="Город" required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field v-model="edit.about" label="Описание" required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" v-if="user.type === 1">
                    <v-select
                      v-model="edit.spec"
                      :hint="`${edit.spec.title}`"
                      :items="specCat"
                      item-text="title"
                      item-value="id"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-btn type="submit" color="success" width="100%">
                      Изменить
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-sheet>
        </v-bottom-sheet>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { auth } from '../plugins/firebase'
import { mapActions, mapGetters } from 'vuex'
export default {
  middleware: 'noauth',
  data() {
    return {
      drawer: false,
      addSheet: false,
      user: '',
      route: this.$route.params.id,
      deleteSheet: false,
      edit: {
        name: '',
        city: '',
        about: '',
        spec: {
          speciality: '',
          id: ''
        }
      }
    }
  },
  watch: {
    $route: async function (route) {
      if (!this.users) {
        await this.fetchUsers()
        this.user = this.userById(route.params.id)
        this.edit = {
          id: this.user.id,
          name: this.user.name,
          city: this.user.city,
          about: this.user.about,
          spec: {
            title: this.user.speciality,
            id: this.user.specialityId
          }
        }
      } else {
        this.user = this.userById(route.params.id)
        this.edit = {
          id: this.user.id,
          name: this.user.name,
          city: this.user.city,
          about: this.user.about,
          spec: {
            title: this.user.speciality,
            id: this.user.specialityId
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/users',
      userById: 'users/usersById',
      specCat: 'spec/specCat'
    })
  },
  async created() {
    auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          await this.fetchUser()
        } else {
        }
      } catch {

      }
    })
    if (!this.users) {
      await this.fetchUser()
      await this.fetchUsers()
      await this.fetchSpecCat()
      this.user = this.userById(this.$route.params.id)
      this.edit = {
        id: this.user.id,
        name: this.user.name,
        city: this.user.city,
        about: this.user.about,
        spec: {
          title: this.user.speciality,
          id: this.user.specialityId
        }
      }
    } else {
      await this.fetchSpecCat()
      this.user = this.userById(this.$route.params.id)
      this.edit = {
        id: this.user.id,
        name: this.user.name,
        city: this.user.city,
        about: this.user.about,
        spec: {
          title: this.user.speciality,
          id: this.user.specialityId
        }
      }
    }
  },
  methods: {
    ...mapActions({
      fetchUsers: 'users/fetchUsers',
      fetchSpecCat: 'spec/fetchSpecCat',
      fetchUser: 'auth/fetchUsers',
      deleteUser: 'users/deleteUser',
      editUser: 'users/editUser'
    })
  }
}
</script>
