import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import router from '@/router'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    movies: [],
    movies_filtered : [],
    token: null
  },
  getters: {
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies
      state.movies_filtered = movies
    },
    SEARCH_FILTER(state, word) {
      state.movies_filtered = state.movies.filter(movie => movie.title.toLowerCase().includes(word))
    },
    SCORE_UP(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        return b.vote_average - a.vote_average
      })
    },
    SCORE_DOWN(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        return a.vote_average - b.vote_average
      })
    },
    TITLE_UP(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        if (a.title > b.title) return 1;
    else if (b.title > a.title) return -1;
    else return 0;
      })
    },
    TITLE_DOWN(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        if (a.title > b.title) return -1;
    else if (b.title > a.title) return 1;
    else return 0;
      })
    },
    DATE_UP(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        return new Date(b.release_date) - new Date(a.release_date)
      })
    },
    DATE_DOWN(state) {
      const movies_filtered = state.movies_filtered
      movies_filtered.sort(function(a, b) {
        return new Date(a.release_date) - new Date(b.release_date)
      })
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      // router.push('/moviesview')
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`
      })
      .then(response => {
        context.commit('GET_MOVIES', response.data) 
      })
      .catch(error => {
        console.log(error)
        console.log('faild ㅠㅠ')
      })
    },
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2
        }
      })
      .then((response) => {
        console.log(response)
        context.commit('SAVE_TOKEN', response.data.key)
      })
      .catch((error) => {
        console.log(error)
        console.log('실패 엌')
      })
    },
    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
      .then((response) => {
        console.log(response)
        context.commit('SAVE_TOKEN', response.data.key)
      })
      .catch((error) => {
        console.log(error)
        console.log('실패 엌')
      })

    }
  },
  modules: {
  }
})
