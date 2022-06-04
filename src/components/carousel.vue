<template>
  <div :id="id" class="carousel slide" :data-bs-ride="ride">
    <div class="carousel-indicators">
      <button type="button" :data-bs-target="`#${id}`" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
      <button type="button" :data-bs-target="`#${id}`" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
      <button type="button" :data-bs-target="`#${id}`" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="card text-center">
          <div class="card-header">
            <span class="badge rounded-pill">html</span>
            <span class="badge rounded-pill">fonts</span>
            <span class="badge rounded-pill">images</span>
          </div>
          <div class="card-body">
            <h5 class="card-title">Название статьи</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aut cum id magni
              officiis quis voluptatum. Deserunt dolorum ducimus eius est molestias, voluptate! Impedit laudantium quia
              veniam? Ea quod, reprehenderit?</p>
            <a href="#" class="btn btn-outline-info">Читать</a>
          </div>
          <div class="card-footer text-muted">
            2 дня назад
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="card text-center">
          <div class="card-header">
            <span class="badge rounded-pill">bootstrap</span>
            <span class="badge rounded-pill">flex</span>
          </div>
          <div class="card-body">
            <h5 class="card-title">Название статьи 2</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aut cum id magni
              officiis quis voluptatum. Deserunt dolorum ducimus eius est molestias, voluptate! Impedit laudantium quia
              veniam? Ea quod, reprehenderit?</p>
            <a href="#" class="btn btn-outline-info">Читать</a>
          </div>
          <div class="card-footer text-muted">
            2 дня назад
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <div class="card text-center">
          <div class="card-header">
            <span class="badge rounded-pill">js</span>
            <span class="badge rounded-pill">vue</span>
            <span class="badge rounded-pill">typescript</span>
            <span class="badge rounded-pill">composition API</span>
          </div>
          <div class="card-body">
            <h5 class="card-title">Название статьи 3</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aut cum id magni
              officiis quis voluptatum. Deserunt dolorum ducimus eius est molestias, voluptate! Impedit laudantium quia
              veniam? Ea quod, reprehenderit?</p>
            <a href="#" class="btn btn-outline-info">Читать</a>
          </div>
          <div class="card-footer text-muted">
            3 дня назад
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
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
    }
  },
  data() {
    return {}
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