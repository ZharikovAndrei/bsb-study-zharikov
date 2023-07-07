<template>
  <v-app>
    <v-app-bar
      app
      color="orange lighten-1"
      dark
    >
      <router-link to="/" exact class="router-link"><strong>Medium clone</strong></router-link>
      <v-spacer></v-spacer>

      <v-btn
        text
        rounded
      >
        <router-link
          to="/"
          exact
          active-class="active"
          tag="v-btn"
        >
          <v-icon class="mr-2">mdi-home</v-icon>
          <span>Home</span>
        </router-link>
      </v-btn>

      <v-btn
        text
        v-if="!auth.isLoggedIn"
        class="mx-4"
        rounded
      >
        <router-link
          to="/sign-in"
          exact
          active-class="active"
          tag="v-btn"
        >
          <v-icon class="mr-2">mdi-account-box</v-icon>
          <span>Sign in</span>
        </router-link>
      </v-btn>

      <v-btn
        text
        v-if="!auth.isLoggedIn"
        class="mr-4"
        rounded
      >
        <router-link
          to="/sign-up"
          exact
          active-class="active"
          tag="v-btn"
        >
          <v-icon class="mr-2">mdi-account-plus</v-icon>
          <span>Sign up</span>
        </router-link>
      </v-btn>

      <v-btn
        text
        v-if="auth.isLoggedIn"
        class="mx-6"
        rounded
      >
        <router-link
          to="/new-article"
          exact
          active-class="active"
          tag="v-btn"
        >
          <v-icon class="mr-2">mdi-newspaper</v-icon>
          <span>New Article</span>
        </router-link>
      </v-btn>

      <v-btn
        text
        v-if="auth.isLoggedIn"
        class="mr-6"
        rounded
      >
        <router-link
          to="/about"
          exact
          active-class="active"
          tag="v-btn"
        >
          <v-icon class="mr-2">mdi-cogs</v-icon>
          <span>Settings</span>
        </router-link>
      </v-btn>

      <v-btn
        text
        rounded
        v-if="auth.isLoggedIn"
        class="mr-6 "
      >
        <router-link
          to="/about"
          exact
          active-class="active"
          tag="v-btn"
        >
          <v-icon class="mr-2">mdi-account</v-icon>
          <span>{{ USER_DATA.username }}</span>
        </router-link>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {mapGetters} from "vuex";
import {authService} from "@/main";

export default {
  name: 'App',

  data: () => ({
    auth: authService,
  }),
  computed: {
    ...mapGetters([
      'USER_DATA'
    ]),
  },
  methods: {}
};
</script>

<style>
.router-link {
  text-decoration: none;
}

.active {
  color: red;
}
</style>
