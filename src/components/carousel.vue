<template>
  <div :id="id" class="carousel slide" :data-bs-ride="ride" v-if="articles">
    <div class="carousel-indicators">
      <template v-for="(art, prop, idx) in articles">
        <button type="button" :data-bs-target="`#${id}`" :data-bs-slide-to="idx" :class="{active: idx === currentSlide}"
                aria-current="true" aria-label="Slide 1" :key="prop"></button>
      </template>
    </div>
    <div class="carousel-inner">

      <div class="carousel-item" :class="{active: idx === currentSlide}" v-for="(art, id, idx) in articles" :key="id">
        <div class="card text-center">
          <div class="card-header">
            <span class="badge rounded-pill" v-for="(tag, idx) in art.tags" :key="tag + idx">{{tag}}</span>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ articleTitle(art) }}</h5>
            <p class="card-text">{{ articleDesc(art) }}</p>
            <a href="#" class="btn btn-outline-info">Читать</a>
          </div>
          <div class="card-footer text-muted">
            {{ getDistance(art.created)}}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <div id="999999" class="carousel slide">
      <div class="carousel-indicators">
          <button type="button" data-bs-target="`#999999`" class="active"
                  aria-current="true" aria-label="Slide 1" ></button>
      </div>
      <div class="carousel-inner">

        <div class="carousel-item active">
          <div class="card text-center">
            <div class="card-header">
              <span class="badge rounded-pill">тег</span>
            </div>
            <div class="card-body">
              <h5 class="card-title">Нет не одной статьи</h5>
              <p class="card-text">Нужно написать статью</p>
              <router-link to="/language" class="btn btn-outline-info">Написать</router-link>
            </div>
            <div class="card-footer text-muted">
              Сегодня: {{getDate()}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {getDistanceDate, getCurrentDate} from "@/assets/js/date";
import {articleDesc, articleTitle} from "@/assets/js/function";
export default {
  name: "carousel",
  props: {
    id: {
      type: String,
      required: true
    },
    ride: {
      type: [Boolean, String],
      default: () => {
        return 'carousel'
      }
    },
    articles: {
      type: [Object, Array],
    }
  },
  data() {
    return {
      currentSlide: 0
    }
  },
  methods: {
    articleTitle,
    articleDesc,
    getDistance(date) {
      return getDistanceDate(date)
    },
    getDate() {
      return getCurrentDate()
    }
  }
}
</script>

<style scoped lang="scss">
.carousel {
  //border: 2px solid #a9a9a9;
  border-radius: 10px;
  padding: 25px;
}
.carousel-indicators {
  margin: 0;
  & button {
    background-color: #000000;
  }
}

.card-header span.badge{
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