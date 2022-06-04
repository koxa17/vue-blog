<template>
  <div class="language">
    <h1>{{languageName.toUpperCase()}}</h1>

      <main>
        <vue-editor v-model="content" />
      </main>

  </div>
</template>

<script>
import Vue from 'vue';
import { VueEditor } from "vue2-editor";
export default Vue.extend({
  name: "Language",
  props: {},
  components: { VueEditor },
  data() {
    return {
      content: "<h1>some content</h1>"
    }
  },
  computed: {
    languageName() {
      return this.$route.params.name
    }
  }
})
</script>

<style scoped lang="scss">

</style>