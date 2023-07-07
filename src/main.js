import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {Vuelidate} from "vuelidate";

Vue.config.productionTip = false
Vue.use(Vuelidate)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isAuthRequired)) {
    if (!authService.isLoggedIn) {
      alert("You must be logged in!");
      return next(false);
    }
  }

  next();
});

export const authService = { isLoggedIn: false };

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
