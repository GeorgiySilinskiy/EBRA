<template>
  <v-row justify="center">
    <v-col cols="12" sm="12">
          <v-form>
        <v-row justify="center">
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="name"
              label="Имя пользователя"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-radio-group v-model.number="type">
          <v-radio
            label="Клиент"
            value="0"
          ></v-radio>
                    <v-radio
            label="Менеджер"
            value="1"
          ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
    </v-form>
    </v-col>
    <template v-if="users">
    <v-card
    class="mx-1 my-1"
    v-for="item in filteredProducts"
    :key="item.id"
    width="100%"
    max-width="344"
    outlined
    link
    :to="`/users/${item.id}`"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{item.name ? item.name : 'Пользователь без имени'}}</v-list-item-title>
          <v-list-item-subtitle v-if="item.type === 0">Пользователь</v-list-item-subtitle>
          <v-list-item-subtitle v-else-if="item.type === 1">Менеджер</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar
          tile
          :src="item.avatar"
          size="80"
          color="grey"
        >
          <v-img :src="item.avatar" aspect-ratio="1.7" />
        </v-list-item-avatar>
      </v-list-item>

      <!-- <v-card-actions>
        <v-btn text>Button</v-btn>
        <v-btn text>Button</v-btn>
      </v-card-actions> -->
    </v-card>
    </template>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      name: '',
      email: '',
      type: 2
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/users'
    }),
    filteredProducts: function () {
      return this.users.filter((product) => {
        return this.type === 2 ? true : product.type === this.type
      }).filter((product) => {
        return this.name === '' ? true : product.name.toLowerCase().indexOf(this.name.toLowerCase()) !== -1
      }).filter((product) => {
        return this.email === '' ? true : product.email.toLowerCase().indexOf(this.email.toLowerCase()) !== -1
      })
    }
  },
  async mounted() {
    await this.fetchUsers()
  },
  methods: {
    ...mapActions({
      fetchUsers: 'users/fetchUsers'
    })
  }
}
</script>

<style>

</style>
