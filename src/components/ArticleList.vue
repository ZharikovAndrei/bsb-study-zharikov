<template>
  <v-container class="articles-list">
    <v-row class="text-center">

      <v-col class="my-4">
        <h1 class="display-2 mb-3">
          Medium Clone
        </h1>
        <p>{{ user_data.username }}</p>
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
              v-if="search"
              class="ma-2"
              close
              large
              @click:close="resetSearch"
            >
              # {{ search }}
            </v-chip>
            <hr>
          </v-col>
        </v-row>

        <ArticleCard
          class="my-10"
          v-for="article in paginatedArticles"
          :key="article.slug"
          v-bind:article_data="article"
        ></ArticleCard>

        <v-pagination
          v-model="pageNumber"
          :length="pageCount"
          total-visible="7"
          color="orange lighten-1"
          :value="pageNumber"
          class="text-center"
        >
        </v-pagination>
      </v-col>

      <v-col cols="3">
        <v-card>
          <v-card-title>Popular tags:</v-card-title>
          <v-card-text>
            <v-btn
              v-for="tag in tags"
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
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import ArticleCard from "@/components/ArticleCard.vue";

export default {
  name: 'ArticleList',
  components: {ArticleCard},
  data: () => ({
    reveal: false,
    showChip: true,
    pageNumber: 1,
    articlesPerPage: 5,
  }),
  computed: {
    ...mapState({
      tags: (state) => state.tags,
      search: (state) => state.search,
      user_data: (state) => state.userData,
    }),
    ...mapGetters([
      'ARTICLES'
    ]),
    pageCount() {
      return Math.ceil(this.ARTICLES.length / this.articlesPerPage)
    },
    paginatedArticles() {
      let from = (this.pageNumber - 1) * this.articlesPerPage
      let to = from + this.articlesPerPage
      return this.ARTICLES.slice(from, to)
    },
  },
  methods: {
    ...mapActions({
      getArticles: 'GET_ARTICLES_FROM_API',
      getTags: 'GET_TAGS_FROM_API',
    }),
    ...mapMutations({
      setSearch: 'SET_SEARCH_TO_STATE',
    }),
    async sendSearch(tag) {
      await this.setSearch(tag)
      this.pageNumber = 1
    },
    async resetSearch() {
      await this.setSearch(null)
    },
  },

  mounted() {
    this.getArticles()
    this.getTags()
  }
}
</script>

<style>
.articles-list {
  width: 70%;
}
</style>
