<template>
  <div>
    <div class="row mb-2">
      <div class="col-12">
        <vue-editor v-model="content" :class="{error: error.validate === 'editor'}"/>
      </div>
    </div>

    <div class="row">

      <div class="d-flex flex-column flex-md-row align-items-center">
        <div class="d-flex mb-2 mb-md-0">
          <v-select v-model="selected" id="selectTags" class="style-chooser me-2"
                    :class="{error: error.validate === 'select'}" placeholder="Выберите теги" :options="tags"
                    :close-on-select="false" multiple taggable push-tag label="name">
          </v-select>

          <button class="btn p-0 btn-add-new-tag" data-bs-toggle="modal" data-bs-target="#modal-added-tag"
                  data-bs-whatever="@mdo">
            <img src="@/assets/images/icons/plus-square-fill.svg" alt="Добавить тег">
          </button>

        </div>
        <div class="hstack gap-3 m-auto m-md-0 ms-md-auto">
          <button @click="saveContent" class="btn btn-success" :class="{disabled: disabled}">Сохранить</button>
          <div class="vr"></div>
          <button type="button" class="btn btn-outline-danger" @click="resetAll">Сбросить</button>
        </div>
      </div>

    </div>

    <div class="modal" tabindex="-1" id="modal-added-tag" ref="modal-add-tag">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Добавление нового тега</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row mb-2">

              <div class="col-12 mb-2">
                <label for="specificSizeInputName">Название тега</label>
                <input type="text" v-model="tagName" class="form-control"
                       :class="{error: error.validate === 'inputNewTagName'}" id="specificSizeInputName"
                       placeholder="Например 'html'" autocomplete="false">
              </div>

              <div class="col-12 mb-2">
                <label for="color-input-pick">Выберите цвет тега</label>
                <input type="text" v-model="colorsPick.hex" class="form-control"
                       :class="{error: error.validate === 'inputColorPicker'}" id="color-input-pick"
                       placeholder="#194D33A8" autocomplete="false" readonly @click="addingTag = !addingTag">
              </div>

              <div class="col-12 mb-3" v-show="addingTag" @dblclick="addingTag = false">
                <Sketch v-model="colorsPick" class="w-auto"/>
              </div>
            </form>

            <div class="col-12 d-flex flex-column align-items-center">
              <p>Вот что получилось</p>
              <Badge :tag="newTag" class="badge-result"/>
            </div>
          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Закрыть</button>
            <button type="button" class="btn btn-success" @click="createNewTag" :class="{disabled: disabled}">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {VueEditor} from "vue2-editor";
import vSelect from 'vue-select'
import {mapActions} from "vuex";
import {Sketch} from 'vue-color'
import Badge from "@/components/Badge";

export default {
  name: "redactor",
  props: {
    tags: {
      type: Array,
      required: true
    },
    nameLanguage: {
      type: String,
      default: () => ''
    }
  },
  components: {
    Badge,
    vSelect,
    VueEditor,
    Sketch
  },
  data() {
    return {
      content: "<h1>Название статьи</h1>",
      selected: [],
      disabled: false,
      error: {},
      notifications: {},
      setTimeoutError: null,
      colorsPick: "#707070",
      tagName: '',
      newTag: {
        name: 'html',
        bg_color: '#707070'
      },
      addingTag: false
    }
  },
  methods: {
    ...mapActions(['save_article__base', 'save_tags__base']),
    // установить контент в редактор
    setEditorContent(content) {
      this.content = content;
    },
    // Сохранить контент
    saveContent() {
      if (this.validateArticles()) {
        this.disabled = true
        this.$loading.show({delay: 0})

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
    validateArticles() {
      if (!this.checkEditor()) {
        this.error = {
          msg: 'Сначала нужно написать статью!', validate: 'editor'
        }
        this.setTimeoutError = setTimeout(() => {
          this.error = {}
        }, 3000)
        this.$noty.warning(this.error.msg)
        return false
      } else if (!this.checkTags()) {
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
    createNewTag() {
      this.$loading.show({delay: 0})
      this.disabled = true
      if (!this.tagName) {
        this.error.validate = 'inputNewTagName'
        this.error.msg = 'Название тега обязательно для заполнения!'
        this.$noty.error(this.error.msg)
      } else if (this.newTag.bg_color === '#707070') {
        this.error.validate = 'inputColorPicker'
        this.error.msg = 'Нужно выбрать цвет!'
        this.$noty.error(this.error.msg)
      }

      this.setTimeoutError = setTimeout(() => {
        this.error = {}
      }, 3000)

      let tagExists = false

      if (this.IsEmpty(this.tags)) {
        tagExists = this.tags.find(tag => {
          return tag.name === this.newTag.name
        })
      }

      if (tagExists) {
        this.error.validate = 'tageExists'
        this.error.msg = 'Такой тег уже существует!'
        this.$noty.error(this.error.msg)
      } else {
        setTimeout(async () => {
          const tag = {}
          Object.assign(tag, this.newTag)
          await this.save_tags__base(tag)
          this.addingTag = false
          this.colorsPick = "#707070"
          this.tagName = ''
          this.$set(this.newTag, '', {
            name: 'html',
            bg_color: '#707070'
          })
          this.disabled = false
          this.$loading.hide()
        }, 1000)

      }
    },
    IsEmpty(obj) {
      if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).length === 0
      }
    }
  },
  computed: {
    tagNameLowerCase() {
      return this.tagName.toLowerCase()
    }
  },
  watch: {
    colorsPick(newValue) {
      this.$set(this.newTag, 'bg_color', newValue.hex)
    },
    tagName(newValue) {
      this.$set(this.newTag, 'name', newValue.toLowerCase())
    },
  },
}
</script>

<style scoped lang="scss">

.style-chooser {
  width: 50%;
  max-width: 300px;
  min-width: 190px;
}

.error {
  outline: 1px solid red;
}

.btn-add-new-tag {
  width: 34px;
  height: 34px;

  & img {
    width: 100%;
  }
}

.badge-result {
  min-width: 150px;
  height: 55px;
  font-size: 30px;
  opacity: 1;

  &:empty {
    width: 100px;
    height: 55px;
  }
}
</style>