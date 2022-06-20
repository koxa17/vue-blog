<template>
  <div>
    <div class="row mb-2">
      <div class="col-12">
        <vue-editor v-model="content" :class="{error: error.validate === 'editor'}"/>
      </div>
    </div>

    <div class="row">

      <div class="hstack gap-3">
        <v-select v-model="selected" id="selectTags" class="style-chooser me-auto" :class="{error: error.validate === 'select'}" placeholder="Выберите теги" :options="tags" :close-on-select="false" multiple taggable push-tag></v-select>
          <button @click="saveContent" class="btn btn-success" :class="{disabled: disabled}">Сохранить</button>
          <div class="vr"></div>
          <button type="button" class="btn btn-outline-danger" @click="resetAll">Сбросить</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { VueEditor } from "vue2-editor";
import vSelect from 'vue-select'
import {writeArticlesData} from "@/assets/api/firebase";
import AWN from "awesome-notifications";
import 'awesome-notifications/dist/style.css';
export default Vue.extend({
  name: "redactor",
  props: {
    tags:{
      type: Array,
      required: true
    },
    nameLanguage: {
      type: String,
      default: () => ''
    }
  },
  components: {
    vSelect,
    VueEditor
  },
  mounted() {
    this.notifications = new AWN({
      position: "bottom-right",
      maxNotifications: 5,
      durations: {
        global: 3000
      },
      labels: {
        alert: '',
        success: '',
        tip: '',
        warning: '',
        info: ''
      },
    })
  },
  data() {
    return {
      content: "<h1>Название статьи</h1>",
      selected: [],
      disabled: false,
      error: {},
      notifications: {},
      setTimeoutError: null
    }
  },
  methods: {
    // установить контент в редактор
    setEditorContent(content) {
      this.content = content;
    },
    // Сохранить контент
    saveContent() {
      if(this.validateArticles()){
        this.disabled = true

        const article = {
          article: this.content,
          tags: this.selected,
        }

        writeArticlesData(this.nameLanguage, article).then(() => {
          this.content = '<h1>Название статьи</h1>'
          this.selected = []
          this.notifications.success('Статья успешно сохранена!')
        }).catch(err => {
          this.notifications.alert(err)
          throw err
        }).finally(() => {
          this.disabled = false
        })
      }

    },
    validateArticles(){
      if(!this.checkEditor()){
        this.error = {
          msg: 'Сначала нужно написать статью!', validate: 'editor'
        }
        this.setTimeoutError = setTimeout(() => {
          this.error = {}
        }, 3000)
        this.notifications.warning(this.error.msg)
        return false
      } else if(!this.checkTags()){
        this.error = {
          msg: 'Выберите хотя бы один тег!', validate: 'select'
        }
        this.setTimeoutError = setTimeout(() => {
          this.error = {}
        }, 3000)
        this.notifications.warning(this.error.msg)
        return false
      } else {
        return true
      }
    },
    checkTags() {
      return !!this.selected.length
    },
    checkEditor() {
      return !(this.content === '<h1>Название статьи</h1>' || this.content === '<h1><br></h1>');
    },
    resetAll() {

      let onOk = () => {
        this.content = '<h1>Название статьи</h1>'
        this.selected = []
        this.error = {}
        this.notifications.info('Все было очищенно!')
      };
      let onCancel = () => {return false}
      this.notifications.confirm(
          'Вы уверены что хотите все очистить?',
          onOk,
          onCancel,
          {
            labels: {
              confirm: 'Внимание',
              confirmOk: 'Да',
              confirmCancel: 'Отмена'
            }
          }
      )
    },

  }
})
</script>

<style scoped>

.style-chooser {
  width: 50%;
  max-width: 300px;
  min-width: 150px;
}

.error {
  outline: 1px solid red;
}
</style>