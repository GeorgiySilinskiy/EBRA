<template>
  <v-content
    class="messages-wrap"
  >
    <v-toolbar
      v-if="dialogById(dialogId)"
      flat
    >
      <v-toolbar-title class="grey--text">
        <span>{{ dialogById(dialogId).userType === 1 ? 'Менеджер' : 'Клиент' }}</span>
        {{ dialogById(dialogId).name }}
        <span v-if="dialogById(dialogId).online" class="online-text">{{ dialogById(dialogId).online === true ? 'Онлайн' : `был в сети ${$moment(dialogById(dialogId).online).fromNow()}` }}</span>
        <span v-else />
      </v-toolbar-title>
      <div class="flex-grow-1" />
      <v-text-field
        v-if="search"
        v-model="searchible"
        label="Поиск  сообщений"
      />
      <v-btn icon @click.prevent="search = !search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click.prevent="attach = !attach">
        <v-icon>attachment</v-icon>
      </v-btn>
      <v-btn v-if="user.type === 1" icon @click.prevent="dialog = !dialog">
        <v-icon>account_balance_wallet</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <v-container
      v-if="!attach"
      class="messages-container"
    >
      <template v-for="message in messagesSearch">
        <Message :key="message.id" :message="message" :user-type="user.type" />
      </template>
    </v-container>
    <v-container
      v-if="attach"
      class="messages-container"
    >
      <v-row>
        <template v-for="attachment in attachments">
          <v-col :key="attachment.id" sm="4">
            <div v-if="attachment.type = 1">
              <a :href="attachment.text" target="_blank">
                <v-img :src="attachment.text" />
              </a>
            </div>
            <div v-if="attachment.type = 3">
              <a :href="attachment.text" target="_blank">
                Документ: <br>
                <h3>{{ attachment.title }}</h3>
              </a>
            </div>
          </v-col>
        </template>
      </v-row>
    </v-container>
    <v-divider />
    <v-container v-if="!attach" style="padding:0; height: 8%">
      <v-form ref="form" v-model="valid" style="height: 100%" @submit.prevent="sendMessage">
        <v-row no-gutters class="mx-10 align-center justify-center" style="height: 100%">
          <v-col lg="1">
            <v-menu top offset-y>
              <template v-slot:activator="{ on }">
                <v-btn small fab v-on="on">
                  <v-icon>attach_file</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  @click="onImageChange"
                >
                  <v-list-item-title>Загрузить изображение</v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="onDocChange"
                >
                  <v-list-item-title>Загрузить Документ</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col lg="8">
            <input
              ref="imageInput"
              type="file"
              style="display:none;"
              accept="image/png,image/jpg,image/svg"
              name="image"
              @change="onFileChange"
            >
            <input
              ref="docInput"
              type="file"
              style="display:none;"
              accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              name="image"
              @change="onFileChange"
            >
            <v-text-field
              v-model="text"
              :rules="textRules"
              label="Введите сообщение"
              solo
              rounded
              single-line
              required
              min-length="2"
            />
          </v-col>
          <v-col lg="1" class="mx-10">
            <v-btn
              type="submit"
              color="teal"
              fab
              small
              dark
            >
              <v-icon>send</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title class="headline">
          Выставление счета за услуги
          <!-- {{ user.post === 0 ? 'юриста' : 'бухгалтера' }} -->
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col lg="12">
              <v-select
                v-model="select"
                :items="servicesList"
                item-text="title"
                item-value="price"
                :hint="`${select.title}, ${select.price}рублей`"
                persistent-hint
                return-object
                single-line
                label="Какая услуга"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn
            color="warning darken-1"
            text
            @click="dialog = false"
          >
            Отменить
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="addPay"
          >
            Выставить счет
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { db, firebase } from '~/plugins/firebase.js'
import Message from '~/components/Message.vue'
class ServicesItem {
  constructor(title, price) {
    this.title = title
    this.price = price
  }
}
export default {
  name: 'LectionAdd',
  head() {
    return {
      title: `${this.newMessage === true ? 'У вас новое сообщение' : `${this.dialogById(this.dialogId).userType === 1 ? 'Менеджер' : 'Клиент'} ${!this.dialogById(this.dialogId).name ? '' : this.dialogById(this.dialogId).name}`}`
    }
  },
  components: {
    Message
  },
  data() {
    return {
      select: { title: '', price: '' },
      dialogId: this.$route.params.id,
      text: '',
      dialog: false,
      attach: false,
      attachments: [],
      files: '',
      dragging: false,
      messages: [],
      type: 0,
      valid: true,
      peopler: {
        online: false,
        name: ''
      },
      suka: '',
      servicesList: [],
      search: false,
      searchible: '',
      attachType: 1,
      newMessage: true,
      textRules: [
        v => (v && v.length <= 1)
      ]
    }
  },
  computed: {
    ...mapGetters({
      dialogById: 'dialogs/dialogsById',
      user: 'auth/user'
    }),
    messagesSearch() {
      return this.messages.filter(item => item.text.toLowerCase().indexOf(this.searchible.toLowerCase()) !== -1)
    }
  },
  mounted() {
    this.$nextTick(() => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          db.collection('users').doc(user.uid).collection('chats').doc(user.uid).collection(this.dialogId).orderBy('time').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((element) => {
              const doc = element.doc.data()
              this.messages.push(doc)
              if (element.doc.data().from === 1) {
                this.newMessage = true
              } else {
                this.newMessage = false
              }
            })
            const container = this.$el.querySelector('.messages-container')
            setTimeout(() => {
              container.scrollTop = container.scrollHeight === container.clientHeight ? 99999 : container.scrollHeight
            })
          })
          db.collection('users').doc(user.uid).collection('attachments').doc(user.uid).collection(this.dialogId).orderBy('time', 'desc').onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((element) => {
              const doc = element.doc.data()
              this.attachments.push(doc)
            })
          })
          if (this.user.post === 0) {
            const services = await db.collection('services').doc('lawyer').collection('lawyer').orderBy('price').get()
            services.docs.forEach((element) => {
              this.servicesList.push(new ServicesItem(element.data().title, element.data().price))
            })
          } else {
            const services = await db.collection('services').doc('accountant').collection('accountant').orderBy('price').get()
            services.docs.forEach((element) => {
              this.servicesList.push(new ServicesItem(element.data().title, element.data().price))
            })
          }
        } else {
        }
      })
      this.peopler = null
    })
  },
  methods: {
    ...mapActions({
      send: 'message/sendMessage',
      addPays: 'message/addPay',
      sendFile: 'message/sendFile'
    }),
    addPay() {
      const text = this.select.title
      const price = this.select.price
      const formData = {
        text,
        price,
        senderId: this.dialogId,
        userId: this.user.id,
        userName: this.user.name,
        time: Date.now(),
        from: 3,
        type: 4
      }
      this.addPays(formData)
    },
    sendMessage() {
      this.text = this.text.trim()
      if (this.$refs.form.validate()) {
        const messageText = {
          text: this.text,
          senderId: this.dialogId,
          userId: this.user.id,
          userName: this.user.name
        }
        this.send(messageText)
        this.text = ''
        this.newMessage = false
      }
    },
    onImageChange() {
      this.$refs.imageInput.click()
    },
    onDocChange() {
      this.$refs.docInput.click()
    },
    onFileChange(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      const type = file.type
      if (type.startsWith('application')) {
        this.sendFile({
          userName: this.user.name,
          senderId: this.dialogId,
          userId: this.user.id,
          title: file.name,
          file: file,
          type: 3
        })
        console.log('Документ')
        return false
      } else if (type.startsWith('image')) {
        this.sendFile({
          userName: this.user.name,
          senderId: this.dialogId,
          userId: this.user.id,
          title: file.name,
          file: file,
          type: 1
        })
        console.log('Картинка')
        return false
      } else {
        console.log('Неверный формат')
        return false
      }
    }
  }
}
</script>

<style>
.messages-wrap {
  height: 100%;
}
.v-card__text a{
  color: inherit
}
html {
  overflow: auto;
}

.messages-container {
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100% - 135px);
}

.v-text-field__details {
  display: none;
}

.v-input__slot {
  margin: 0;
}

/* Let's get this party started */
.messages-container::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.messages-container::-webkit-scrollbar-track {
  -webkit-border-radius: 0;
  border-radius: 0;
}

/* Handle */
.messages-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.205);
}

.messages-container::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(0, 0, 0, 0.205);
}
</style>
