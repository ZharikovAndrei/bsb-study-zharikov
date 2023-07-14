<template>
  <v-container class="articles-list">
    <v-row class="text-center">

      <v-col class="my-4">
        <h1 class="display-2 mb-3">
          Medium Clone
        </h1>
        <!--        <p>{{ USER_DATA.username }}</p>-->
        <p class="subheading font-weight-regular">
          A place to share knowledge
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="9"
      >
        <!--        <v-row>-->
        <!--          <v-col>-->
        <!--            <v-chip-->
        <!--              class="ma-2"-->
        <!--              large-->
        <!--              @click="resetSearch"-->
        <!--            >-->
        <!--              Global feed-->
        <!--            </v-chip>-->
        <!--            <v-chip-->
        <!--              v-if="search"-->
        <!--              class="ma-2"-->
        <!--              close-->
        <!--              large-->
        <!--              @click:close="resetSearch"-->
        <!--            >-->
        <!--              # {{ search }}-->
        <!--            </v-chip>-->
        <!--            <hr>-->
        <!--          </v-col>-->
        <!--        </v-row>-->

        <ArticleCard
          class="my-10"
          :articles="articles"
          v-for="article in articles"
          :key="article.slug"
          v-bind:article_data="article"
        >
        </ArticleCard>
        ;okjhgufydtrse
        <!--        <div class="text-center">-->
        <!--          <v-pagination-->
        <!--            :length="2"-->
        <!--          >-->
        <!--                        v-model="dataPagination.pageNumber">-->
        <!--                        :totalPages="dataPagination.totalPages"-->
        <!--          </v-pagination>-->
        <!--        </div>-->
      </v-col>

      <!--      <v-col-->
      <!--        cols="3"-->
      <!--      >-->
      <!--        <v-card>-->
      <!--          <v-card-title>Popular tags:</v-card-title>-->
      <!--          <v-card-text>-->
      <!--            <v-btn-->
      <!--              v-for="tag in tags"-->
      <!--              class="ma-1"-->
      <!--              elevation="3"-->
      <!--              active-class="active"-->
      <!--              @click="sendSearch(tag)"-->
      <!--            >-->
      <!--              {{ tag }}-->
      <!--            </v-btn>-->

      <!--          </v-card-text>-->
      <!--        </v-card>-->
      <!--      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import ArticleCard from "@/components/ArticleCard.vue";

export default {
  name: 'ArticleList',
  components: {ArticleCard},
  data: () => ({
    reveal: false,
    showChip: true,
  }),
  computed: {
    ...mapState({
      articles: (state) => state.articles,
      // tags: (state) => state.tags,
      // search: (state) => state.search,
      // formData: (state) => state.formData,
      // dataPagination: (state) => state.dataPagination,
    }),
  },
  methods: {
    ...mapActions([
      'GET_ARTICLES_FROM_API'
      // getTags: 'GET_TAGS_FROM_API',
    ]),
    ...mapMutations([
      'SET_ARTICLES_TO_STATE',
      // setPageSize: 'SET_PAGE_SIZE',
      // setSearch: 'SET_SEARCH_TO_STATE',
    ]),
    // async sendSearch(tag) {
    //   await this.setSearch(tag)
    // },
    // async resetSearch() {
    //   await this.setSearch(null)
    // },
    // async changePageSize(num) {
    //   await this.setPageSize(num)
    //   await this.getArticles()
    // },
  },

  mounted() {
    this.GET_ARTICLES_FROM_API()
      // .then(response => {
      //   if (response) {
      //     console.log("Articles arrived: ")
      //   }
      // })
    // this.getTags()
    //   .then(response => {
    //     if (response) {
    //       console.log("Tags arrived")
    //     }
    //   })
  }
}
</script>

<style>
.articles-list {
  width: 70%;
}
</style>
