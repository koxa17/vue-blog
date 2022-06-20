<template>
  <div id="app">
    <div class="container-fluid">
      <div
          class="row d-flex flex-nowrap flex-column-reverse justify-content-end flex-md-row justify-content-md-start">
        <div class="col-12 col-md-1 p-0 d-flex flex-column align-items-center wrapper-side-bar border-side--right">
          <side-bar></side-bar>
        </div>
        <div class="pt-2 pb-3 width-100" :class="colClass">
          <div class="container-md side-bar-padding-response">
            <router-view/>
          </div>
        </div>
        <div
            class="col-12 col-md-3 ps-0 pe-0 ps-md-2 pe-md-2 pt-2 pb-md-2 border-side--left mb-3 mb-md-0 right-side-bar" v-if="$route.meta.filters">
          <filters></filters>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import SideBar from "@/components/side-bar";
import Filters from "@/components/filters";
// import {writeTagData} from "@/assets/api/firebase";


export default Vue.extend({
  components: {Filters, SideBar},
  data() {
    return {
      sideFilter: false,
    }
  },
  async mounted() {
    // await writeTagData(['html', 'css', 'js'])
  },
  computed: {
    colClass() {
      return this.routeName !== 'language' ? 'col-12 col-md-11 offset-md-1' : 'col-8 offset-md-1'
    },
    routeName() {
      return this.$route.name
    },
  },
  watch: {
    routeName(value) {
      this.sideFilter = value === 'language';
    }
  }
})
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

#app {
  height: 100%;
}


.border-side--left {
  border-left: 1px solid #b2b2b2;
}

.border-side--right {
  border-right: 1px solid #b2b2b2;
}


.wrapper-side-bar {
  position: fixed;
  top: 0;
  bottom: 0;
}

@media (max-width: 768px) {
  .wrapper-side-bar {
    top: auto;
    z-index: 10;
    &.border-side--right {
      border-right: none;
      border-top: 1px solid #b2b2b2;
    }
  }

  .side-bar-padding-response {
    padding-bottom: 100px;
  }
}

.right-side-bar {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
}


@media (max-width: 768px) {
  .right-side-bar {
    position: relative;
  }
  .width-100 {
    width: 100% !important;
  }
}

//.right-side-bar {
//  width: 100%;
//}
//
//@media (min-width: 768px) {
//  .right-side-bar {
//    width: auto;
//  }
//}

</style>
