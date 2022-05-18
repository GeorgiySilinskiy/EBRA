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
    <v-col cols="12" md="6" v-for="item in specCat" :key="item.id">
      <SpecCat :item="item" />
    </v-col>
    <v-bottom-sheet v-model="addSheet" persistent>
      <v-sheet class="text-center">
        <v-btn class="mt-6" color="error" @click="addSheet = !addSheet">Закрыть</v-btn>
        <v-form @submit.prevent="addSpecCat(add); addSheet = !addSheet">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="4">
                <v-text-field v-model="add.title" label="Заголовок специализации" required>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-btn type="submit" color="success" width="100%">
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
import SpecCat from '@/components/SpecCat.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      addSheet: false,
      add: {
        title: ''
      }
    }
  },
  components: {
    SpecCat
  },
  async created() {
    await this.fetchSpecCat()
  },
  computed: {
    ...mapGetters({
      specCat: 'spec/specCat'
    })
  },
  methods: {
    ...mapActions({
      fetchSpecCat: 'spec/fetchSpecCat',
      addSpecCat: 'spec/addSpecCat'
    })
  }
}
</script>

<style>

</style>
