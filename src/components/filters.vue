<template>
  <div class="filters ps-2 pe-2 pb-3 pb-md-0">
    <h4 class="pb-3">Фильтры</h4>
    <form class="row g-3">
      <div class="col-12">
        <label for="inputEmail4" class="form-label">Названию</label>
        <input type="text" class="form-control" id="inputEmail4" placeholder="Подключение шрифтов">
      </div>
      <div class="col-12">
        <label for="inputAddress" class="form-label">Описанию</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="Нужно импортировать script">
      </div>
      <div class="col-12">
        <label for="selectTags" class="form-label">По тегу</label>
        <v-select id="selectTags" v-model="selected" :options="tags" :close-on-select="false">
            <!-- eslint-disable-next-line vue/no-unused-vars  -->
            <template v-if="tags.length" #no-options="{ search, searching }">
              Такой тег не найден
            </template>
            <!-- eslint-disable-next-line vue/no-unused-vars  -->
            <template v-else #no-options="{ loading }">
              {{ error }}
            </template>
        </v-select>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Поиск</button>
      </div>
    </form>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import {getBase} from "@/assets/api/firebase";
export default {
  name: "filters",
  props: {},
  components: {
    vSelect
  },
  data() {
    return {
      selected: [],
      tags: [],
      error: ''
    }
  },
  async mounted() {
    const data = await getBase('tags')
    if(typeof data === 'object') {
      this.tags = data
    } else {
     this.error = data
    }
  },
  methods:{
    addTag(newTag) {
      console.log(newTag)
    }
  }
}
</script>

<style scoped lang="scss">
.filters {
  width: 100%;
  border-bottom: none;
}

@media (max-width: 768px) {
  .filters {
    border-bottom: 1px solid #b2b2b2;
  }
}
</style>