import Vue from "vue";
import Vuex from "vuex";
import {getBase, removeArticle, writeArticlesData, writeTagData} from "@/assets/api/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: {},
    tags: [],
    error: {}
  },
  getters: {
    getArticles(state) {
      return state.articles
    },
    getTags(state) {
      return state.tags
    },
    getError(state) {
      return state.error
    }
  },
  mutations: {
    add_article__state(state, payload) {
      Vue.set(state.articles, payload.id, payload.data)
    },
    set_article__state(state, payload) {
      state.articles = payload
    },
    delete_article__state(state, data){
      Vue.delete(state.articles, data.id)
    },
    add_tag__state(state, payload) {
      state.tags.push(payload)
    },
    set_tags__state(state, payload){
      state.tags = payload
    },
    set_error (state, payload) {
      state.error = payload
    }
  },
  actions: {
    save_article__base(context, payload) {
      return writeArticlesData(payload).then((res) => {
        context.commit('add_article__state', res)
        return res
      }).catch(err => {
        throw err
      })
    },
    get_article__base(context, payload) {
      getBase(payload).then((res) => {
        if(!res) {
          context.commit('set_error', {
            type: 'info',
            msg: 'Список пуст!'
          })
        } else {
          context.commit('set_article__state', res)
          context.commit('set_error', {})
        }
      })
    },
    remove_article__base(context, payload){
      removeArticle(payload.id).then(() => {
        context.commit('delete_article__state', payload)
      }).catch(err => {
        throw err
      })
    },
    get_tags__base(context, payload){
      getBase(payload).then(res => {
        context.commit('set_tags__state', res)
      }).catch(err => {
        throw err
      })
    },
    save_tags__base(context, payload) {
      writeTagData(payload).then(res => {
        console.log('save-tag', res)
        context.commit('add_tag__state', payload)
      })
    }
  },
  modules: {},
});
