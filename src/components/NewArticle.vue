<template>
  <v-container class="new-article">
    <form>
      <v-text-field
        v-model="newArticle.title"
        label="Title"
        required
        outlined
      ></v-text-field>

      <v-text-field
        v-model="newArticle.description"
        label="Description"
        required
        outlined
      ></v-text-field>

      <v-textarea
        v-model="newArticle.body"
        auto-grow
        label="Body"
        outlined
        rows="4"
        row-height="30"
      ></v-textarea>

      <v-text-field
        v-model="newArticle.tagList"
        label="Tag list"
        required
        outlined
      ></v-text-field>

      <v-btn
        class="mr-4"
        color="success"
        @click="submit"
      >
        submit
      </v-btn>
    </form>
  </v-container>
</template>

<script>
import {defineComponent} from 'vue'
import {mapActions} from "vuex";

export default defineComponent({
  name: "NewArticle",
  data: () => ({
    newArticle: {
      title: '',
      description: '',
      body: '',
      tagList: [],
    },
  }),
  methods: {
    ...mapActions([
      'CREATE_AN_ARTICLE',
    ]),
    submit() {
      this.CREATE_AN_ARTICLE(this.newArticle)
        .then(response => {
          if (response) {
            console.log("Article was created: ", response.data)
            this.$router.push('/')
          }
        })
    },
  },
})
</script>

<style>
.new-article {
  width: 40%;
}
</style>
