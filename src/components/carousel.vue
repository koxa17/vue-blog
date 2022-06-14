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
            <span class="badge rounded-pill">html</span>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ art.title }}</h5>
            <p class="card-text">{{ art.description }}</p>
            <a href="#" class="btn btn-outline-info">Читать</a>
          </div>
          <div class="card-footer text-muted">
            {{ getDistance(art.created) }}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {getDistanceDate} from "@/assets/js/date";
export default Vue.extend({
  name: "carousel",
  props: {
    id: {
      type: String,
      required: true
    },
    ride: {
      type: [Boolean, String],
      default: ():string => {
        return 'carousel'
      }
    },
    articles: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      currentSlide: 0
    }
  },
  methods: {
    getDistance(date:string):string {
      return getDistanceDate(date)
    }
  }
})
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