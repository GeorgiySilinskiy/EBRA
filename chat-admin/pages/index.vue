<template>
  <v-row justify="center">
    <v-card
    class="mx-1"
    max-width="344"
    outlined
    link
    to="/users"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Пользователи</v-list-item-title>
          <v-list-item-subtitle>Персональные данные пользователей</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-card
    class="mx-1"
    max-width="344"
    outlined
    link
    to="/promocode"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Промокоды</v-list-item-title>
          <v-list-item-subtitle>Промокоды со скидками</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-card
    class="mx-1"
    max-width="344"
    outlined
    link
    to="/spec"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Специализации</v-list-item-title>
          <v-list-item-subtitle>Специализации</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-card
    class="mx-1"
    max-width="344"
    outlined
    link
    to="/services"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Услуги</v-list-item-title>
          <v-list-item-subtitle>Оказываемые услуги</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <!-- <v-card
      class="mx-1"
      max-width="344"
      outlined
      link
      to="/dialogs"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Диалоги</v-list-item-title>
          <v-list-item-subtitle>Диалоги пользователей</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card> -->
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      addSheet: false
    }
  }
}
</script>
