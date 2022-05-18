<template>
  <v-card>
    <v-card class="mx-auto" flat>
      <v-toolbar flat>
        <v-toolbar-title class="grey--text">Диалоги</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container fluid>
        <v-row v-if="users">
          <template v-for="item in dialogs" >
            <v-col cols="12" sm="4" :key="item.id" v-if="usersById(item.id)">
              <v-card
                class="mx-1 my-1"
                width="100%"
                outlined
                link
                :to="`/users/${$route.params.id}/dialogs/${item.id}`"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">
                      {{ usersById(item.id).name ? usersById(item.id).name : 'Пользователь без имени'}}
                    </v-list-item-title>
                    <v-list-item-subtitle v-if="usersById(item.id).type === 0">Пользователь</v-list-item-subtitle>
                    <v-list-item-subtitle v-else-if="usersById(item.id).type === 1">Менеджер</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-avatar tile :src="usersById(item.id).avatar" size="80" color="grey">
                    <v-img :src="usersById(item.id).avatar" aspect-ratio="1.7" />
                  </v-list-item-avatar>
                </v-list-item>
              </v-card>
            </v-col>
          </template>

        </v-row>
      </v-container>
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'user-lay',
  data() {
    return {
      user: ''
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/users',
      dialogs: 'dialogs/dialogs',
      usersById: 'users/usersById'
    })
  },
  async mounted() {
    await this.fetchDialogUser(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      fetchDialogUser: 'dialogs/fetchDialogsUser'
    })
  }
}
</script>

<style>
  .profile{
    position: sticky;
    top: 80px;
  }
</style>
