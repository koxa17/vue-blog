<template>
  <div class="language">
    <div class="top mb-4 d-flex align-items-center">
      <h1 class="me-2">{{ languageName.toUpperCase() }}</h1>
      <button class="btn btn-add d-flex align-items-center" @click="adding = !adding">
        <img src="@/assets/images/icons/plus-circle.svg" alt="" class="me-1" v-if="!adding">
        <img src="@/assets/images/icons/arrow-left-circle.svg" alt="" class="me-1" v-if="adding">
        {{ !adding ? 'Добавить' : 'Назад' }}
      </button>
    </div>


    <main>

      <redactor v-if="adding" :tags="tags" :name-language="languageName"/>

      <div v-else>
        <div v-if="typeof articles === 'object'" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2 g-lg-3">
          <div class="col p-2" v-for="(article, id) of articles" :key="id">
            <div class="card">
              <button class="remove-icon" @click="removeItem(id)">
                <img src="@/assets/images/icons/trash.svg" alt="Удалить" class="remove-icon__img">
              </button>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title mb-0">{{ articleTitle(article) }}</h5>
                <p class="card-author text-muted mb-2">Автор: <span class="fst-italic">Критисна Матусевич</span></p>
                <div class="badges">
                  <badge v-for="(tag, idx) of article.tags" :key="tag + idx" :name="tag"/>
                </div>
                <div class="description mt-1 mb-3">
                  <p class="card-text text-truncate">{{ articleDesc(article) }}</p>
                </div>
                <div class="card-body__footer d-flex justify-content-between align-items-end">
                  <a href="#" class="btn btn-primary">Читать</a>
                  <span class="date-created text-muted">{{ article.created }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div v-if="typeof articles === 'string'" class="d-flex flex-column align-items-center justify-content-center">
          <h2>Здесь пока нет не одной статьи</h2>
          <p>Что бы добавить статью нажмите на кнопку </p>
          <button class="btn btn-add d-flex align-items-center" @click="adding = !adding">
            <img src="@/assets/images/icons/plus-circle.svg" alt="" class="me-1">
            Добавить
          </button>
        </div>
      </div>


    </main>

  </div>
</template>
<script>
import 'vue-select/dist/vue-select.css';
import {getBase, removeArticle} from "@/assets/api/firebase";
import Redactor from "@/components/redactor";
import Badge from "@/components/Badge";

export default {
  name: "Language",
  props: {},
  components: {Badge, Redactor},
  data() {
    return {
      tags: [],
      articles: [],
      reload: 0,
      adding: false
    }
  },
  computed: {
    languageName() {
      return this.$route.params.name
    },

  },
  mounted() {
    this.reload++
  },
  methods: {
    articleTitle(article) {
      let title = ''

      let start = article.article.search('<h1>')
      let end = article.article.search('<p>')
      title = article.article.slice(start, end).replace(/<h1>/g, '').replace(/<\/h1>/g, '')

      return title
    },
    articleDesc(article) {

      let desc = ''
      let regArrHead = ['h2', 'h3', 'h4', 'h5', 'h6']
      let description = article.article.replace(/<p><br><\/p>/g, '')
      for (let i = 0; i < regArrHead.length; i++) {
        description = description.replace(new RegExp(`<h${regArrHead[i]}>`, 'g')).replace(new RegExp(`</h${regArrHead[i]}>`, 'g'))
      }

      let start = description.search('<p>')
      let end = description.search('</p>')
      desc = description.slice(start, end + 4)

      return desc.replace(/<p>/g, '').replace(/<\/p>/g, '')
    },
    removeItem(id) {
      removeArticle(`${this.languageName}/${id}`)
      this.reload++
    },
    async getTags() {
      this.tags = await getBase('tags')
    },
    async getArticles() {
      this.articles = await getBase(`articles/${this.languageName}`)
    },
  },
  watch: {
    reload() {
      this.articles = []
      this.getTags()
      this.getArticles()
    },
  }
}
</script>

<style scoped lang="scss">
.btn-add {
  border: 2px solid transparent;

  &:hover {
    border-color: darkmagenta;
  }

  &:focus {
    box-shadow: 0 0 0 0.25rem rgba(215, 3, 215, .2);
  }
}

.card {
  height: 100%;
  position: relative;

  & .remove-icon {
    border: none;
    background: none;
    position: absolute;
    width: 24px;
    height: 28px;
    right: 0;
    top: 0;
    opacity: .5;

    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }
}

.card-body {
  height: 100%;

  &__footer {
    margin: auto 0 0 0;
  }
}


.card-author {
  font-size: 12px;
}

.date-created {
  font-size: 14px;
}

.dadges span.badge {
  cursor: pointer;
  background-color: #4e4e4e;

  &:hover {
    background-color: #2299f8;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
}

</style>