<template>
  <span class="badge" :class="classBackground" :style="{ backgroundColor: tag.bg_color }">
    {{ tag.name }}
  </span>
</template>

<script>


export default {
  name: "Badge",
  props: {
    tag: {
      type: Object,
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
}
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
</style>