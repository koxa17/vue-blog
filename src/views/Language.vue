<template>
  <div class="language">
    <h1 class="mb-4">{{languageName.toUpperCase()}}</h1>

      <main>
        <div class="row mb-2">
          <div class="col-12">
            <vue-editor v-model="content" />
          </div>
        </div>

        <div class="row">
          <div class="col-12 d-flex justify-content-between align-items-center">

            <v-select id="selectTags" class="style-chooser" placeholder="Выберите теги" v-model="selected" :options="tags" :close-on-select="false" multiple taggable push-tag></v-select>
            <button @click="saveContent" class="btn btn-success">Сохранить</button>

          </div>
        </div>


      </main>

  </div>
</template>

<script>
import Vue from 'vue';
import { VueEditor } from "vue2-editor";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import {getBase} from "@/assets/api/firebase";
export default Vue.extend({
  name: "Language",
  props: {},
  components: { VueEditor, vSelect },
  data() {
    return {
      content: "<h1>Название статьи</h1>",
      selected: [],
      tags: []
    }
  },
  computed: {
    languageName() {
      return this.$route.params.name
    }
  },
  methods: {
    // установить контент в редактор
    setEditorContent(content) {
      this.content = content;
    },
    // Сохранить контент
    saveContent() {
      console.log(this.content)
    }
  },
  async mounted() {
    this.tags = await getBase('/tags')
  },
})
</script>

<style scoped lang="scss">
.style-chooser {
  width: 50%;
  max-width: 300px;
  min-width: 150px;
}
</style>