import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Language from "../views/Language.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/language/:name",
    name: 'language',
    component: Language,
    meta: {
      filters: true,
      adding: false
    },
    props: {
      filters: true,
      adding: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
