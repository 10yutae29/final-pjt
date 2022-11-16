import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import MoviesView from '../views/MoviesView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/moviesview',
    name: 'moviesview',
    component: MoviesView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
