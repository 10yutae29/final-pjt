import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    movies: [
      
    ]
  },
  getters: {
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`
      })
      .then(response => {
        // console.log(response)
        console.log(this.state.movies, context)

        // console.log(response.data, context)
        context.commit('GET_MOVIES', response.data)
        console.log(this.state.movies)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})
