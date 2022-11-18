import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
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
    token: null,
    logedin_user: null,
    user_info: null,
    movie_comments: null,
    selected_genres: [],
  },
  getters: {
    isLogin(state) {
      return state.token ? true: false
    },
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.movies = movies
      state.movies_filtered = state.movies
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
      router.push('/moviesview')
    },
    GET_LOGIN_USER(state, logedin_user) {
      state.logedin_user = logedin_user
      state.user_info = logedin_user
      console.log(state.logedin_user)
    },
    LOG_OUT(state) {
      state.logedin_user = null
      state.token = null
      router.push('/moviesview')
      console.log('여기까지')
    },
    GET_MOVIE_COMMENTS(state, comments) {
      state.movie_comments = comments
    },
    GET_SELECTED_GENRES(state, selected_genres){
      state.selected_genres = selected_genres
    },
    GET_IS_LIKED(state, isLiked) {
      state.detail_liked = isLiked
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
        context.commit('SAVE_TOKEN', response.data.key)
      })
      .catch((error) => {
        console.log(error)
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
        context.commit('SAVE_TOKEN', response.data.key)
      })
      .catch((error) => {
        console.log(error)
      })

    },
    changePassword(context, payload) {
      axios({
        method: 'post',
        url:  `${API_URL}/accounts/password/change/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        data: {
          new_password1: payload.new_password1,
          new_password2: payload.new_password2,
        }
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getLoginUser(context) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
      .then((response) => {
        context.commit('GET_LOGIN_USER', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    logOut(context) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/logout/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
      .then((response) => {
        console.log(response)
        context.commit('LOG_OUT')
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getMovieComments(context, movie_id) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${movie_id}/`,
      })
      .then((response) => {
        const comments = response.data.comment_set
        context.commit('GET_MOVIE_COMMENTS', comments)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    deleteComment(context, commentItem) {
      axios({
        method: 'delete',
        url: `${API_URL}/community/comment/${commentItem[0]}/`,
      })
      .then((response) => {
        this.dispatch('getMovieComments',commentItem[1],response)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    createComment(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/community/comment/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        data: {
          content: payload.content,
          user: payload.user,
          movie: payload.movie,
        },
      })
      .then((response) => {
        console.log(response)
        this.dispatch('getMovieComments',payload.movie)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getSelectedGenres(context){
      axios({
        method: 'get',
        // django에서 이 url로 현재 로그인한 사람이 선택한 장르 리스트를 올려줌
        url: `${API_URL}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
      .then((response) => {
        // console.log(response.data)
        context.commit('GET_SELECTED_GENRES', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    // toggleLike(context, movie_id) {
    //   axios({
    //     method: 'post',
    //     url: `${API_URL}/movies/${movie_id}/likes/`,
    //     headers: {
    //       Authorization: `Token ${context.state.token}`
    //     },
    //   })
    //   .then((response) => {
    //     const isLiked = response.data.is_liked
    //     // console.log(response.data.is_liked)
    //     context.commit('GET_IS_LIKED', isLiked)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    // },
    // getIsLiked(context, isLiked) {
    //   context.commit('GET_IS_LIKED',isLiked)
    // }
  },
  modules: {
  }
})
