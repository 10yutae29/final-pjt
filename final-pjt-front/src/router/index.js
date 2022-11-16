import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesView from '../views/MoviesView.vue'
import RecommendView from '../views/RecommendView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/moviesview',
    name: 'moviesview',
    component: MoviesView
  },
  {
    path: '/RecommendView',
    name: 'RecommendView',
    component: RecommendView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
