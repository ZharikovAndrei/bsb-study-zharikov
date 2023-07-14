import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)


const state = () => ({
  articles: [],
  // tags: [],
  // search: null,
  // userData: {},
  // newArticle: {},
  // formData: {
  //   pageNumber: 1,
  //   pageSize: 10,
  // },
  // dataPagination: {},
})

// const getters = {
//   ARTICLES(state) {
//     if (!state.search) {
//       return state.articles;
//     }
//     return state.articles.filter(element => element.tagList.includes(state.search));
//   },
//   TAGS(state) {
//     return state.tags;
//   },
//   IMAGES(state) {
//     return state.articles.image;
//   },
//   SEARCH(state) {
//     console.log('SEARCH: ', state.search)
//     return state.search;
//   },
//   // USER_DATA(state) {
//   //   return state.userData;
//   // },
//   // NEW_ARTICLE(state) {
//   //   return state.newArticle;
//   // },
// }

const mutations = {
  SET_ARTICLES_TO_STATE(state, articles) {
    state.articles = articles
  },
  // SET_TAGS_TO_STATE(state, tags) {
  //   state.tags = tags
  // },
  // SET_SEARCH_TO_STATE(state, search) {
  //   state.search = search
  // },
  // SET_USER_DATA_TO_STATE(state, userData) {
  //   state.userData = userData;
  //   console.log(state.userData, 'set user data')
  // },
  // STATE_NEW_ARTICLE_TO_STATE(state, newArticle) {
  //   state.newArticle = newArticle;
  // },
  // SET_PAGINATION(state, {pageNumber, totalPages}) {
  //   state.dataPagination = {pageNumber, totalPages}
  // },
  // SET_PAGE_NUMBER(state, pageNumber = state.formData.pageNumber) {
  //   state.formData = {
  //     ...state.formData,
  //     pageNumber,
  //   }
  // },
  // SET_PAGE_SIZE(state, pageSize = state.formData.pageSize) {
  //   state.formData = {
  //     ...state.formData,
  //     pageSize: pageSize,
  //   }
  // },
}

const actions = {
  async GET_ARTICLES_FROM_API({commit}) {
    try {
      const response = await axios('https://api.realworld.io/api/articles?limit=20&offset=0', {
        method: "GET"
      })
      let result = await response;
        if(result) {
          console.log(result.data.articles)
          commit('SET_ARTICLES_TO_STATE', result.data.articles)
        }
    } catch (error) {
      console.log(error);
    }
  },
  // async GET_TAGS_FROM_API({commit}) {
  //   await axios('https://api.realworld.io/api/tags', {
  //     method: 'GET'
  //   })
  //     .then(response => {
  //       commit('SET_TAGS_TO_STATE', response.data.tags);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // },
  // async GET_EXISTING_USER_DATA_FROM_API({commit, state, rootState}, signInData) {
  //   console.log('У action прыйшлі: ', signInData.email, signInData.password)
  //   console.log(state)
  //   console.log(rootState)
  //   await axios.post('https://api.realworld.io/api/users/login', {
  //     user: {
  //       email: signInData.email,
  //       password: signInData.password,
  //     }
  //   })
  //     .then(response => {
  //       commit('SET_USER_DATA_TO_STATE', response.data.user)
  //       alert('You have logged in')
  //       return response.data;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return error;
  //     })
  // },
  // async CREATE_AN_ARTICLE({commit, state}, newArticle) {
  //   await axios.post('https://api.realworld.io/api/articles', {
  //       article: {
  //         title: newArticle.title,
  //         description: newArticle.description,
  //         body: newArticle.body,
  //         tagList: newArticle.tagList,
  //       },
  //     },
  //     {
  //       headers: {
  //         "Authorization": `Bearer ${state.userData.token}`,
  //         'Content-Type': 'application/json'
  //       },
  //     })
  //     .then(response => {
  //       commit('STATE_NEW_ARTICLE_TO_STATE', response.data)
  //       alert(`Article created by ${this.state.userData.username}`)
  //       return response.data;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       return error;
  //     })
  // },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
