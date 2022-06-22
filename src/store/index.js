import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: []
  },
  getters: {
    getArticles(state) {
      return state.articles
    }
  },
  mutations: {

  },
  actions: {

  },
  modules: {},
});
