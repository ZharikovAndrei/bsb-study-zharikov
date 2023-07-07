import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    tags: [],
    search: null,
    userData: {},
    newArticle: {},
  },
  getters: {
    ARTICLES(state) {
      if (!state.search) {
        return state.articles;
      }
      return state.articles.filter(element => element.tagList.includes(state.search));
    },
    TAGS(state) {
      return state.tags;
    },
    IMAGES(state) {
      return state.articles.image;
    },
    SEARCH(state) {
      console.log('SEARCH: ', state.search)
      return state.search;
    },
    USER_DATA(state) {
      return state.userData;
    },
    NEW_ARTICLE(state) {
      return state.newArticle;
    },
  },
  mutations: {
    SET_ARTICLES_TO_STATE: (state, articles) => {
      state.articles = articles;
    },
    SET_TAGS_TO_STATE: (state, tags) => {
      state.tags = tags;
    },
    SET_SEARCH_TO_STATE: (state, search) => {
      state.search = search;
      console.log('SET_SEARCH_TO_STATE: ', search)
    },
    SET_USER_DATA_TO_STATE: (state, userData) => {
      state.userData = userData;
    },
    STATE_NEW_ARTICLE_TO_STATE: (state, newArticle) => {
      state.newArticle = newArticle;
    }
  },
  actions:
    {
      GET_ARTICLES_FROM_API({commit}) {
        return axios('https://api.realworld.io/api/articles?limit=197&offset=0', {
          method: "GET"
        })
          .then(response => {
            commit('SET_ARTICLES_TO_STATE', response.data.articles);
            return response;
          })
          .catch(error => {
            console.log(error);
            return error;
          })
      },
      GET_TAGS_FROM_API({commit}) {
        return axios('https://api.realworld.io/api/tags', {
          method: 'GET'
        })
          .then(response => {
            commit('SET_TAGS_TO_STATE', response.data.tags);
            return response;
          })
          .catch(error => {
            console.log(error);
            return error;
          })
      },
      GET_EXISTING_USER_DATA_FROM_API({commit}, signInData) {
        console.log('У action прыйшлі: ', signInData.email, signInData.password)
        return axios.post('https://api.realworld.io/api/users/login', {
          user: {
            email: signInData.email,
            password: signInData.password,
          }
        })
          .then(response => {
            commit('SET_USER_DATA_TO_STATE', response.data.user)
            alert('You have logged in')
            return response.data.user;
          })
          .catch(error => {
            console.log(error);
            return error;
          })
      },
      CREATE_AN_ARTICLE({commit}, newArticle) {
        return axios.post('https://api.realworld.io/api/articles', {
            article: {
              title: newArticle.title,
              description: newArticle.description,
              body: newArticle.body,
              tagList: newArticle.tagList,
            },
          },
          {
            auth: {
              email: this.state.userData.email,
              password: this.state.userData.password,
            },
          })
          .then(response => {
            commit('STATE_NEW_ARTICLE_TO_STATE', response.data)
            alert(`Article created by ${this.state.userData.username}`)
            return response.data;
          })
          .catch(error => {
            console.log(error);
            return error;
          })
      },
    },
  modules: {}
})
