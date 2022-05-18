<template>
  <v-row :class="{'justify-start': message.from === 1, 'justify-end': message.from === 0, 'justify-center': message.type === 4}">
    <v-col lg="auto" style="max-width: 80%;">
      <v-card :class="{'white': message.from === 1, 'indigo darken-4': message.from === 0, 'elevation-0 text-center': message.type === 4}">
        <v-card-text :class="{'black--text': message.from === 1, 'white--text': message.from === 0}">
          <div v-if="message.type === 1">
            <a :href="message.text" target="_blank">
              <v-img max-width="200px" :src="message.text" />
              <!-- {{ message.title }} -->
            </a>
          </div>
          <div v-else-if="message.type === 3">
            <a :href="message.text" target="_blank">
              Документ: <br>
              {{ message.title }}
            </a>
          </div>
          <div v-else-if="message.type === 4" class="black--text" style="display: block">
            <span v-if="message.flag">
              Менеджер закрыл вопрос <b>{{ message.text }}</b>,
              стоимость услуг составила: <b>{{ message.price }}₽.</b> <br>
            </span>
            <span v-else>
              Оплачена услуга {{ message.text }}. <br>
            </span>
          </div>
          <div v-else-if="message.type === 0">
            {{ message.text }}
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      default: () => {}
    },
    userType: {
      type: Number,
      default: 0
    }
  }
}
</script>
