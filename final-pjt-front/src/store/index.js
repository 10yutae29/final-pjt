import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'


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
    user_detail: null,
    random_movies: null,
    genres_length: null,
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
    },
    LOG_OUT(state) {
      // console.log('여기')
      
      state.logedin_user = null
      state.token = null
    
      localStorage.removeItem('logedin_user')
      localStorage.removeItem('token')
      // console.log('사이')
      // localStorage.removeItem('vuex')
      // console.log(localStorage.vuex)
      router.push('/')

      // if(this.$route.path !=='/moviesview') router.push('/moviesview')
      // console.log(this.$route.path)

    },
    GET_MOVIE_COMMENTS(state, comments) {
      state.movie_comments = comments
    },
    GET_SELECTED_GENRES(state, selected_genres){
      state.selected_genres = selected_genres
      state.genres_length = selected_genres.result.length
      if (state.genres_length == 0) {
        const movies = state.movies
        const random_movies = _.sampleSize(movies, 15)
        state.random_movies = random_movies
        console.log(state.random_movies)
      }

    },
    GET_USER_INFO(state, user_detail) {
      state.user_detail = user_detail
    },
    GET_RANDOM_MOVIES(state) {
      const movies = state.movies
        const random_movies = _.sampleSize(movies, 15)
        state.random_movies = random_movies
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
        axios({
          method: 'get',
          url: `${API_URL}/accounts/user/`,
          headers: {
            Authorization: `Token ${response.data.key}`
          },
        })
        .then((response) => {
          context.commit('GET_LOGIN_USER', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
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
        console.log(response)
        axios({
          method: 'get',
          url: `${API_URL}/accounts/user/`,
          headers: {
            Authorization: `Token ${response.data.key}`
          },
        })
        .then((response) => {
          context.commit('GET_LOGIN_USER', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      })
      .catch((error) => {
        console.log(error)
        window.alert('아이디와 비밀번호를 확인해주세요.')
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
      .then(() => {
        router.push('/moviesview')
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
    // logOut(context) {     
    //   context.commit('LOG_OUT')
    // },
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
    getUserInfo(context, user_pk){
      axios({
        method: 'get',
        url: `${API_URL}/accounts_detail/${user_pk}`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
      .then((response) => {
        console.log(response.data)
        context.commit('GET_USER_INFO', response.data)
      })
      .catch((error) => {
        console.log(error)
        console.log('에러남 ㄷ')
      })
    },
    getRandomMovies(context){
      context.commit('GET_RANDOM_MOVIES')
    },
    getSelectedGenres(context){
      axios({
        method: 'get',
        // django에서 이 url로 현재 로그인한 사람이 선택한 장르 리스트를 올려줌
        url: `${API_URL}/accounts_detail/recommend/${this.state.logedin_user.pk}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
      .then((response) => {
        console.log(response.data)
        context.commit('GET_SELECTED_GENRES', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    goGenres(context, picked_movies) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts_detail/recommend/${this.state.logedin_user.pk}/`,
        data: {
          picked_movies: picked_movies
        },
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
      .then((response) => {
        console.log(response)
        this.getSelectedGenres()
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})





// axios({
//   method: 'get',
//   url: `${API_URL}/movies/prefer-list/${this.state.logedin_user.pk}`,
//   headers: {
//     Authorization: `Token ${context.state.token}`
//   },
// })
// // 좋아요한 영화가 하나도 없을 때
// // 위처럼 요청을 보내면 아래처럼 응답이 와야함
// response.data.my-prefer-genres = []

// axios({
//   method: 'post',
//   url: `${API_URL}/movies/prefer-list/${this.state.logedin_user.pk}`,
//   headers: {
//     Authorization: `Token ${context.state.token}`,
//   data: {
//     Picked_Genres : ['공포', '코미디', 'SF', '가족', '코미디', '액션'],
//     plus: true
//   }
//   },
// })
// // 첫 Recommend 페이지에서 영화 3개를 고르고 Picked_Genres로 담아 위와같이 보내면
// // django에서는 Picked_Genres를 for을 돌며 
// // prefer-genres의 logedin_user.pk row의 장르에 카운트 +를 해준다


// axios({
//   method: 'get',
//   url: `${API_URL}/movies/prefer-list/${this.state.logedin_user.pk}`,
//   headers: {
//     Authorization: `Token ${context.state.token}`
//   },
// })
// // 좋아요한 영화가 있거나 첫 Recommend페이지에서 선택한 영화가 db에서 다 count 된상태에서 위와같이 요청을 보내면
// // 아래와 같은 응답이 와야함
// response.data.my-prefer-genres = ['코미디', '공포', '가족']