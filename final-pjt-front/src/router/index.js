import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesView from '../views/MoviesView.vue'
import RecommendView from '../views/RecommendView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/moviesview',
    name: 'moviesview',
    component: MoviesView
  },
  {
    path: '/recommendview',
    name: 'recommendview',
    component: RecommendView
  },
  {
    path: '/loginview',
    name: 'loginview',
    component: LoginView
  },
  {
    path: '/signupview',
    name: 'signupview',
    component: SignUpView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
