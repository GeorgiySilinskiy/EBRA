<template>
  <v-row :class="{'justify-start': message.from === 1, 'justify-end': message.from === 0, 'justify-center': message.type === 4}">
    <v-col lg="auto" style="max-width: 80%;">
      <v-card :class="{'white': message.from === 1, 'teal': message.from === 0, 'elevation-0 text-center': message.type === 4}">
        <v-card-text :class="{'black--text': message.from === 1, 'white--text': message.from === 0}">
          <span v-if="message.type === 1">
            <a :href="message.text" target="_blank">
              <v-img max-width="200px" :src="message.text" /> <br>
              {{ message.title }}
            </a>
          </span>
          <span v-else-if="message.type === 3">
            <a :href="message.text" target="_blank">
              Документ: <br>
              {{ message.title }}
            </a>
          </span>
          <span v-else-if="message.type === 4" class="black--text" style="display: block">
            <span v-if="message.flag">
              Менеджер закрыл вопрос <b>{{ message.text }}</b>,
              стоимость услуг составила: <b>{{ message.price }}₽.</b> <br>
              Нажмите кнопку ниже чтобы оплатить <br> <br>
              <v-btn v-if="userType === 0 && message.flag === true" class="white--text" to="/payment" color="teal">
                Оплатить
              </v-btn>
            </span>
            <span v-else>
              Вы оплатили услугу {{ message.text }}. <br>
              Спасибо что выбрали нас!
            </span>
          </span>
          <span v-else-if="message.type === 0">
            {{ message.text }}
          </span>
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
