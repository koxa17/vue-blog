<template>
  <main class="home">
    <h1 class="mb-5">Главная</h1>
    <div class="row mb-5">
      <div class="col-12">
        <div class="category category--html pt-3 pb-3 ps-4 pe-4">
          <div class="category__top d-flex align-items-center d-flex justify-content-center">
            <div class="category__top__logo">
              <img src="@/assets/images/icons/html-logo.svg" alt="" class="category__top__logo__img">
            </div>
            <div class="category__top__title">
              <router-link :to="{name: 'language', params: {name: 'html'}}">HTML</router-link>
            </div>
          </div>
          <div class="category__body">
            <carousel id="carousel_1"/>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12">
        <div class="category category--css pt-3 pb-3 ps-4 pe-4">
          <div class="category__top d-flex align-items-center d-flex justify-content-center">
            <div class="category__top__logo">
              <img src="@/assets/images/icons/css-logo.svg" alt="" class="category__top__logo__img">
            </div>
            <div class="category__top__title">
              <router-link :to="{name: 'language', params: {name: 'css'}}">CSS</router-link>
            </div>
          </div>
          <div class="category__body">
            <carousel id="carousel_2" :ride="false"/>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="category category--js pt-3 pb-3 ps-4 pe-4">
          <div class="category__top d-flex align-items-center d-flex justify-content-center">
            <div class="category__top__logo">
              <img src="@/assets/images/icons/js-logo.svg" alt="" class="category__top__logo__img">
            </div>
            <div class="category__top__title">
              <router-link :to="{name: 'language', params: {name: 'js'}}">JS</router-link>
            </div>
          </div>
          <div class="category__body">
            <carousel id="carousel_3" :ride="true"/>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Carousel from "@/components/carousel.vue";

export default Vue.extend({
  name: "Home",
  components: {Carousel},
  props: {},
  data() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.category {
  border-radius: 10px;

  &--html {
    border: 1px solid #ff6c39;
  }

  &--css {
    border: 1px solid #2299f8;
  }

  &--js {
    border: 1px solid #ffde25;
  }

  &__top {
    &__logo {
      width: 38px;
      margin-right: 15px;

      &__img {
        width: 100%;
        height: 100%;
      }
    }

    &__title {
      font-size: 24px;
      font-weight: bold;

      & a {
        text-decoration: none;
        color: inherit;
      }
    }
  }

}
</style>