<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-row align="center">
        <v-col cols="12" md="10">
          <h2>Юридические услуги</h2>
        </v-col>
                <v-col cols="12" md="2">
          <v-btn
            color="indigo"
            fab
            large
            dark
            class="v-btn--example"
            @click="addSheet = true; add.type = 'lawyer';"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6" v-for="item in lawyer" :key="item.id">
          <Service :item="item"/>
        </v-col>
      </v-row>
    </v-col>
        <v-col cols="12" md="6">
      <v-row align="center">
        <v-col cols="12" md="10">
          <h2>Бухгалтерские услуги</h2>
        </v-col>
                <v-col cols="12" md="2">
          <v-btn
            color="indigo"
            fab
            large
            dark
            class="v-btn--example"
            @click="addSheet = true; add.type = 'accountant';"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6" v-for="item in accountant" :key="item.id">
          <Service :item="item"/>
        </v-col>
      </v-row>
    </v-col>
    <v-bottom-sheet v-model="addSheet" persistent>
      <v-sheet class="text-center">
        <v-btn class="mt-6" color="error" @click="addSheet = !addSheet">Закрыть</v-btn>
        <v-form @submit.prevent="addService(add); addSheet = !addSheet">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field v-model="add.title"  label="Название услуг" required>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model.number="add.price" label="Цена" required></v-text-field>
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
import Service from '@/components/Service.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      addSheet: false,
      add: {
        code: '',
        value: 0,
        type: ''
      }
    }
  },
  components: {
    Service
  },
  async created() {
    await this.fetchServices()
  },
  computed: {
    ...mapGetters({
      accountant: 'service/accountant',
      lawyer: 'service/lawyer'
    })
  },
  methods: {
    ...mapActions({
      fetchServices: 'service/fetchService',
      addService: 'service/addService'
    })
  }
}
</script>

<style>

</style>
