import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('/src/components/SignIn.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('/src/components/SignUp.vue')
  },
  {
    path: '/new-article',
    name: 'NewArticle',
    component: () => import('/src/components/NewArticle.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
