import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {authService, mediumApi} from "@/main";

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
    },
  },
  actions: {
    async GET_ARTICLES_FROM_API({commit}) {
      try {
        const response = await axios('https://api.realworld.io/api/articles?limit=197&offset=0', {
          method: "GET"
        })
        if (response) {
          commit('SET_ARTICLES_TO_STATE', response.data.articles);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async GET_TAGS_FROM_API({commit}) {
      try {
        const response = await axios('https://api.realworld.io/api/tags', {
          method: 'GET'
        })
        if (response) {
          commit('SET_TAGS_TO_STATE', response.data.tags);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async GET_EXISTING_USER_DATA_FROM_API({commit}, signInData) {
      try {
        console.log('У action прыйшлі: ', signInData.email, signInData.password)
        const response = await axios.post('https://api.realworld.io/api/users/login', {
          user: {
            email: signInData.email,
            password: signInData.password,
          }
        })
        if (response.status === 200) {
          commit('SET_USER_DATA_TO_STATE', response.data.user)
          authService.isLoggedIn = true

        }
      } catch (error) {
        authService.isLoggedIn = false
        alert(`email or password ${error.response.data.errors['email or password']}`);
      }
    },
    async CREATE_AN_ARTICLE({commit}, newArticle) {
      try {
        const response = await mediumApi.post('https://api.realworld.io/api/articles', {
          article: {
            title: newArticle.title,
            description: newArticle.description,
            body: newArticle.body,
            tagList: newArticle.tagList,
          },
        })
        if (response) {
          commit('STATE_NEW_ARTICLE_TO_STATE', response.data)
          console.log(`Article created by ${this.state.userData.username}`)
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {}
})

