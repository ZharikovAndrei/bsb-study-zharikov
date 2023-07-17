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
        active-class="active-route"
        v-for="btn in buttons"
        :key="buttons.route"
        :to="btn.route"
        exact
        class="mx-4"
        v-if="auth.isLoggedIn === btn.isLoggedIn || !btn.hasOwnProperty('isLoggedIn')"
      >
        <v-icon class="mr-2">{{ btn.icon }}</v-icon>
        <span>{{ btn.title }}</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {authService} from "@/main";

export default {
  name: 'App',

  data: () => ({
    auth: authService,
    buttons: [
      {
        title: 'Home',
        icon: 'mdi-home',
        route: {name: 'home'},
      },
      {
        title: 'Sign In',
        icon: 'mdi-account-box',
        route: {name: 'SignIn'},
        isLoggedIn: false,
      },
      {
        title: 'Sign Up',
        icon: 'mdi-account-plus',
        route: {name: 'SignUp'},
        isLoggedIn: false,
      },
      {
        title: 'New Article',
        icon: 'mdi-newspaper',
        route: {name: 'NewArticle'},
        isLoggedIn: true,
      },
      {
        title: 'Settings',
        icon: 'mdi-cogs',
        route: {name: 'about'},
        isLoggedIn: true,
      },
      {
        title: 'My profile',
        icon: 'mdi-account',
        route: {name: 'about'},
        isLoggedIn: true,
      },
    ],
  }),
  computed: {},
  methods: {}
};
</script>

<style>
.router-link {
  text-decoration: none;
}

.v-application a.active-route {
  color: red;
}
</style>
