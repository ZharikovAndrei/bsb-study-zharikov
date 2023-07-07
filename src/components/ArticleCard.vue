<template>
  <v-card>
    <v-row no-gutters>
      <v-col
        cols="1"
      >
        <v-avatar size="46" class="ma-2"
        >
          <img
            alt="user"
            src="https://api.realworld.io/images/demo-avatar.png"
          >
        </v-avatar>
      </v-col>

      <v-col
        cols="4"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>{{ article_data.author.username }}</v-list-item-title>
            <v-list-item-subtitle>{{ article_data['createdAt'] }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>

    <v-card-title>{{ article_data.title }}</v-card-title>
    <v-card-text class="pb-0">{{ article_data.description }}</v-card-text>

    <v-btn
      text
      @click="reveal = true"
      v-if="!reveal"
      class="ma-2"
    >
      Read More
    </v-btn>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        outlined
        color="transparent"
      >
        <v-card-text class="pb-0">
          <span
            v-for="list in article_data.tagList"
            class="mx-1"
          >
            <v-chip>
              {{ list }}
            </v-chip>
          </span>
        </v-card-text>
        <v-card-actions class="pt-1">
          <v-btn
            class="mt-1"
            text
            @click="reveal = false"
          >
            Hide
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ArticleCard",
  data: () => ({
    reveal: false,
  }),
  props: {
    article_data: {
      type: Object,
      default() {
        return {}
      }
    },
  },
})
</script>
