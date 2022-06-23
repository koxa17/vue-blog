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
    // переделать добавление, так как это обьект а не массив
    add_article__state(state, payload) {
      if(state.articles[payload.nameLanguage]){
        state.articles[payload.nameLanguage][payload.article.id] = payload.article.data
      } else {
        state.articles[payload.nameLanguage] = {
          [payload.article.id]: payload.article.data
        }
      }
    },
    set_article__state(state, payload) {
      state.articles = payload
    },
    delete_article__state(state, data){
      state.articles.map(language => {
        return language.filter(lang => {
          return data.id !== lang
        })
      })
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
      return writeArticlesData(payload.nameLanguage, payload.article).then((res) => {
        context.commit('add_article__state', {nameLanguage: payload.nameLanguage, article: res})
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
      const path = `${payload.languageName}/${payload.id}`
      removeArticle(path).then((res) => {
        console.log('remove', res)
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
