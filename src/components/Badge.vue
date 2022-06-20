<template>
  <span class="badge" :class="classBackground">
    {{ name }}
  </span>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: "Badge",
  props: {
    name: {
      type: String,
      required: true
    },
    roundedPill: {
      type: Boolean,
      default:() => true
    },
  },
  data() {
    return {}
  },
  computed: {
    classBackground() {
      return {
        [this.name]: this.name, 'rounded-pill': this.roundedPill
      }
    }
  }
})
</script>

<style scoped lang="scss">
.badge {
  cursor: pointer;
  font-size: 12px;
  opacity: .6;
  min-width: 36px;
  background: #4e4e4e;
  text-shadow: 1px 1px 1px #000000;
  outline: 1px solid gray;
  &:hover {
    opacity: 1;
  }
  &:not(:last-child){
    margin-right: 5px;
  }
}

.html {
  background: #e44d26;
}

.css {
  background: #2299f8;
}

.js {
  background: #ffde25;
}

.vue {
  background: #42b883;
}
</style>