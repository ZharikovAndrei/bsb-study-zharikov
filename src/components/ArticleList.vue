<template>
  <v-container class="articles-list">
    <v-row class="text-center">

      <v-col class="my-4">
        <h1 class="display-2 mb-3">
          Medium Clone
        </h1>
        <p>{{USER_DATA.username}}</p>
        <p class="subheading font-weight-regular">
          A place to share knowledge
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="9"
      >
        <v-row>
          <v-col>
            <v-chip
              class="ma-2"
              large
              @click="resetSearch"
            >
              Global feed
            </v-chip>
            <v-chip
              v-if="SEARCH"
              class="ma-2"
              close
              large
              @click:close="resetSearch"
            >
              # {{ SEARCH }}
            </v-chip>
            <hr>
          </v-col>
        </v-row>

        <article-card
          class="my-10"
          v-for="article in ARTICLES"
          v-bind:article_data="article"
        >
        </article-card>
      </v-col>

      <v-col
        cols="3"
      >
        <v-card>
          <v-card-title>Popular tags:</v-card-title>
          <v-card-text>
            <v-btn
              v-for="tag in TAGS"
              class="ma-1"
              elevation="3"
              active-class="active"
              @click="sendSearch(tag)"
            >
              {{ tag }}
            </v-btn>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import ArticleCard from "@/components/ArticleCard.vue";
import store from '@/store/index.js';

export default {
  name: 'ArticleList',
  components: {
    ArticleCard
  },
  data: () => ({
    reveal: false,
    showChip: true,
  }),
  computed: {
    ...mapGetters([
      'ARTICLES',
      'TAGS',
      'SEARCH',
      'USER_DATA'
    ]),
  },
  methods: {
    ...mapActions([
      'GET_ARTICLES_FROM_API',
      'GET_TAGS_FROM_API',
    ]),
    ...mapMutations([
      'SET_ARTICLES_TO_STATE'
    ]),
    sendSearch: (tag) => {
      store.commit('SET_SEARCH_TO_STATE', tag)
    },
    resetSearch: () => {
      store.commit('SET_SEARCH_TO_STATE', null)
    }
  },

  mounted() {
    this.GET_ARTICLES_FROM_API()
      .then(response => {
        if (response) {
          console.log("Articles arrived: ", response.data.articlesCount)
        }
      })
    this.GET_TAGS_FROM_API()
      .then(response => {
        if (response) {
          console.log("Tags arrived")
        }
      })

  }

}
</script>

<style>
.articles-list {
  width: 70%;
}
</style>
