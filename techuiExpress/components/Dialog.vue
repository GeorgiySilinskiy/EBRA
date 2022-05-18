<template>
  <v-list-item>
    <v-avatar
      v-if="dialog.badge"
      width="20px"
      min-width="20px"
      height="20px"
      class="mx-5"
      color="teal"
      style="color: #fff; line-height: 20px;"
    >
      {{ dialog.badge }}
    </v-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ dialog.name }}
        <span class="online-text">
          <span v-if="dialog.online === true">Онлайн</span>
          <span v-else>был в сети {{ $moment(dialog.online).fromNow() }}</span>
        </span>
      </v-list-item-title>
      <v-list-item-subtitle class="text--primary">
        <span v-if="dialog.type === 0">
          <span v-if="dialog.from === 0">Вы: </span>
          <span v-else>Вам: </span>
          {{ dialog.text }}
        </span>
        <span v-if="dialog.type === 1">
          <span v-if="dialog.from === 0">Вы</span>
          <span v-else>Вам</span>
          отправили изображение
        </span>
        <span v-if="dialog.type === 3">
          <span v-if="dialog.from === 0">Вы</span>
          <span v-else>Вам</span>
          отправили документ
        </span>
        <span v-if="dialog.type === 4">
          <span v-if="dialog.from === 0">Вы</span>
          <span v-else>Вам</span>
          выставили счет на оплату
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-list-item-action-text>
        {{ $moment(dialog.time).fromNow() }}
      </v-list-item-action-text>
    </v-list-item-action>
  </v-list-item>
  <!-- <v-col @click="goChat(dialog.id)">
    <v-card color="#385F73" dark>
      <v-card-text class="white--text">
        <div class="headline mb-2">
          {{ dialog.name }}
        </div>
        {{ dialog.text }}
      </v-card-text>
    </v-card>
  </v-col> -->
</template>

<script>
export default {
  props: {
    dialog: {
      type: Object,
      default: () => {}
    }
  },
  updated() {
    if (this.dialog.from === 0) return
    const audio = new Audio()
    audio.src = '/notyfy.mp3'
    audio.autoplay = true
  },
  methods: {
  }
}
</script>

<style scope>
  .online-text{
    font-size: 14px;
    color: #c4c4c4
  }
  .cir{
    width: 15px;
    height: 15px;
    background: green;
    display: inline-block;
    border-radius: 50%;
  }
  .active{
    color: red;
  }
  .v-list-item__content{
    color: #1B3454;
  }
  .theme--light.v-application .text--primary{
    color: #1B3454!important;
  }
</style>
