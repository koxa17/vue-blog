<template>
  <div id="app">
    <div class="container-fluid h-100">
      <div class="row h-100 d-flex flex-nowrap flex-column-reverse justify-content-end flex-md-row justify-content-md-start">
        <div class="col-12 col-md-1 p-0 d-flex flex-column align-items-center border-side--right max-width position">
          <side-bar></side-bar>
        </div>
        <div class="pt-2 pb-3" :class="colClass">
         <div class="container">
           <router-view/>
           <router-view/>
           <router-view/>
           <router-view/>
           <router-view/>
           <router-view/>
           <router-view/>
         </div>
        </div>
        <div class="col-12 col-md-3 ps-0 pe-0 ps-md-2 pe-md-2 pt-2 pb-md-2 border-side--left mb-3 mb-md-0 right-side-bar">
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

export default Vue.extend({
  components: {Filters, SideBar},
  data(){
    return {
      sideFilter: false
    }
  },
  computed: {
    colClass() {
      return this.routeName !== 'language' ? 'col-12 col-md-11' : 'col-8'
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

.border-side--right {
  border-right: 1px solid #b2b2b2;
}

.border-side--left {
  border-left: 1px solid #b2b2b2;
}


.max-width {
  max-width: 130px;
}

.position {
  position: absolute;

}

@media (min-width: 768px) {
  .position {
    position: relative;
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
