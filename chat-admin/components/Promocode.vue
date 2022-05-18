<template>
  <div>
    <v-card outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Промокод</div>
          <v-list-item-title class="headline mb-1">{{item.code}}</v-list-item-title>
          <v-list-item-subtitle>Скидка: {{item.value}}%</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-btn color="indigo" dark small @click="addSheet = true">Редактировать</v-btn>
        <v-btn text color="error" small @click="deletePromo(item.id)">Удалить</v-btn>
      </v-card-actions>
    </v-card>
    <v-bottom-sheet v-model="addSheet" persistent>
      <v-sheet class="text-center">
        <v-btn class="mt-6" color="error" @click="addSheet = !addSheet">Закрыть</v-btn>
        <v-form @submit.prevent="editPromo(edit); addSheet = !addSheet">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="edit.code"  label="Код" required>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model.number="edit.value" label="Процент скидки" required></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn
                  type="submit"
                  color="success"
                  width="100%"
                >
                  Изменить
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      addSheet: false,
      edit: {
        code: this.item.code,
        value: this.item.value,
        id: this.item.id
      }
    }
  },
  methods: {
    ...mapActions({
      deletePromo: 'promocode/deletePromo',
      editPromo: 'promocode/editPromo'
    })
  }
}
</script>

<style>

</style>
