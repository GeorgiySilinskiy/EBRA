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
      <SpecCatItem :item="item" />
    </v-col>
    <v-bottom-sheet v-model="addSheet" persistent>
      <v-sheet class="text-center">
        <v-btn class="mt-6" color="error" @click="addSheet = !addSheet">Закрыть</v-btn>
        <v-form @submit.prevent="addSpecCatItem(add); addSheet = !addSheet">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="4">
                <v-text-field v-model="add.title" label="Название услуги" required>
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
import SpecCatItem from '@/components/SpecCatItem.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      addSheet: false,
      add: {
        title: '',
        specId: this.$route.params.id
      }
    }
  },
  components: {
    SpecCatItem
  },
  async created() {
    await this.fetchSpecCatItem(this.$route.params.id)
  },
  computed: {
    ...mapGetters({
      specCat: 'spec/specCatItems'
    })
  },
  methods: {
    ...mapActions({
      fetchSpecCatItem: 'spec/fetchSpecCatItem',
      addSpecCatItem: 'spec/addSpecCatItem'
    })
  }
}
</script>

<style>

</style>
