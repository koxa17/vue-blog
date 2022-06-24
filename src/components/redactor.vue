<template>
  <div>
    <div class="row mb-2">
      <div class="col-12">
        <vue-editor v-model="content" :class="{error: error.validate === 'editor'}"/>
      </div>
    </div>

    <div class="row">

      <div class="hstack gap-3">
        <v-select v-model="selected" id="selectTags" class="style-chooser me-auto" :class="{error: error.validate === 'select'}" placeholder="Выберите теги" :options="tags" :close-on-select="false" multiple taggable push-tag label="name"></v-select>
          <button @click="saveContent" class="btn btn-success" :class="{disabled: disabled}">Сохранить</button>
          <div class="vr"></div>
          <button type="button" class="btn btn-outline-danger" @click="resetAll">Сбросить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import vSelect from 'vue-select'
import {mapActions} from "vuex";

export default {
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
    ...mapActions(['save_article__base']),
    // установить контент в редактор
    setEditorContent(content) {
      this.content = content;
    },
    // Сохранить контент
    saveContent() {
      if(this.validateArticles()){
        this.disabled = true
        this.$loading.show({delay:0})

        const article = {
          article: this.content,
          tags: this.selected,
        }

        this.save_article__base(article).then(() => {
            this.content = '<h1>Название статьи</h1>'
            this.selected = []
            this.$noty.success('Статья успешно сохранена!')
        }).catch(err => {
            this.$noty.error(err)
            throw err
          }).finally(() => {
            this.disabled = false
            this.$loading.hide()
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
        this.$noty.warning(this.error.msg)
        return false
      } else if(!this.checkTags()){
        this.error = {
          msg: 'Выберите хотя бы один тег!', validate: 'select'
        }
        this.setTimeoutError = setTimeout(() => {
          this.error = {}
        }, 3000)
        this.$noty.warning(this.error.msg)
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
      this.$dialog({
        title: 'Удаление!',
        content: 'Вы уверены что хотите все очистить?',
        btns: [{
          label: 'Да',
          color: '#198754',
          callback: () => {
            this.content = '<h1>Название статьи</h1>'
            this.selected = []
            this.error = {}
            this.$noty.info('Все было очищенно!')
          },
        },
          {
            label: 'Отмена',
            color: '#dc3545',
            ghost: true,
          }],
      })
    },

  }
}
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