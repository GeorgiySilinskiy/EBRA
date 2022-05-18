<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-btn
        color="indigo"
        fab
        large
        dark
        class="v-btn--example"
        @click="addSheet = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" md="2" v-for="item in promocodes" :key="item.id">
      <Promocode :item="item"/>
    </v-col>
    <v-bottom-sheet v-model="addSheet" persistent>
      <v-sheet class="text-center">
        <v-btn class="mt-6" color="error" @click="addSheet = !addSheet">Закрыть</v-btn>
        <v-form @submit.prevent="addPromo(add); addSheet = !addSheet">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="add.code"  label="Код" required>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model.number="add.value" label="Процент скидки" required></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn
                  type="submit"
                  color="success"
                  width="100%"
                >
                  Добавить
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-sheet>
    </v-bottom-sheet>
  </v-row>
</template>

<script>
import Promocode from '@/components/Promocode.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      addSheet: false,
      add: {
        code: '',
        value: 0
      }
    }
  },
  components: {
    Promocode
  },
  async created() {
    await this.fetchPromocodes()
  },
  computed: {
    ...mapGetters({
      promocodes: 'promocode/promocodes'
    })
  },
  methods: {
    ...mapActions({
      fetchPromocodes: 'promocode/fetchPromo',
      addPromo: 'promocode/addPromo'
    })
  }
}
</script>

<style>

</style>
