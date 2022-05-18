<template>
  <v-card>
    <v-card class="mx-auto" flat>
      <v-toolbar flat v-if="users">
        <v-btn
          class="mx-4 my-4 elevation-0"
          fab
          link
          x-small
          style="background: transparent"
          :to="`/users/${$route.params.id}`"
        >
          <v-icon dark>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text">Диалог c</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-list class="py-0">
          <v-list-item link :to="`/users/${$route.params.dialogid}`">
            <v-list-item-avatar class="mx-0 my-0" style="align-self:initial;">
              <v-img :src="usersById($route.params.dialogid).avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content style="align-self:initial;" class="mx-2">
              <v-list-item-title>{{usersById($route.params.dialogid).name}}</v-list-item-title>
              <v-list-item-subtitle v-if="usersById($route.params.dialogid).type === 0">Пользователь
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else-if="usersById($route.params.dialogid).type === 1">
                Менеджер
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-container fluid>
      <v-row v-if="users" class="px-2">
        <v-col cols="12" sm="12" class="dialog-window">
          <template v-for="message in messages">
            <Message :key="message.id" :message="message" />
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  </v-card>
</template>

<script>
import Message from '@/components/Message'
import { mapGetters, mapActions } from 'vuex'
export default {
  layout: 'user-lay',
  components: {
    Message
  },
  data() {
    return {
      user: ''
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/users',
      messages: 'message/messages',
      usersById: 'users/usersById'
    })
  },
  async mounted() {
    await this.fetchMessages({
      dialogId: this.$route.params.dialogid,
      userId: this.$route.params.id
    })
  },
  methods: {
    ...mapActions({
      fetchMessages: 'message/fetchMessages'
    })
  }
}
</script>

<style lang="scss">
  .profile{
    position: sticky;
    top: 80px;
  }
  .dialog-window {
    height: calc(100vh - 220px);
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {

    }
    &::-webkit-scrollbar-thumb {
        background: #E8EAF6;
        transition: all .3s;
        &:hover {
          transition: all .3s;
          background: #7986CB;
        }
    }
  }

</style>
