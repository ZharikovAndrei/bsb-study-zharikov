import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {Vuelidate} from "vuelidate";
import axios from "axios";

Vue.config.productionTip = false
Vue.use(Vuelidate)

export const mediumApi = axios.create()
mediumApi.interceptors.request.use(
  async (config) => {
    console.log(config)
    const token = store.state.userData.token;
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  }
)

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
