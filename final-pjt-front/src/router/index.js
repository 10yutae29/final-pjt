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
import store from '../store/index.js'
import NotFound404 from '../views/NotFound404.vue'

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
    path: '/passwordchangeview/',
    name: 'PasswordChangeView',
    component: PasswordChangeView
  },
  {
    path: '/404-not-found',
    name: 'NotFound404',
    component: NotFound404
  },
  {
    path: '/moviesview/:id',
    name: 'DetailView',
    component: DetailView
  },
  {
    path:'*',
    redirect: { name: 'NotFound404' }
  }
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.token

  const authPages = ['RecommendView']

  const isAuthRequired = authPages.includes(to.name)

  if (isAuthRequired && !isLoggedIn) {
    window.alert('로그인이 필요한 서비스입니다.')
    next({ name: 'LoginView'})
  } else {
    next()
  }
})