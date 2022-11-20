import Vue from 'vue'
import VueRouter from 'vue-router'
import MoviesView from '../views/MoviesView.vue'
import RecommendView from '../views/RecommendView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import UserView from '../views/UserView.vue'
import DetailView from '../views/DetailView.vue'
import PasswordChangeView from '../views/PasswordChangeView.vue'
import MainView from '../views/MainView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/moviesview',
    name: 'MoviesView',
    component: MoviesView
  },
  {
    path: '/recommendview',
    name: 'RecommendView',
    component: RecommendView
  },
  {
    path: '/loginview',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signupview',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/userview/',
    name: 'UserView',
    component: UserView
  },
  {
    path: '/moviesview/:id',
    name: 'DetailView',
    component: DetailView
  },
  {
    path: '/passwordchangeview/',
    name: 'PasswordChangeView',
    component: PasswordChangeView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
