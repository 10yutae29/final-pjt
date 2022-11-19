<template>
  <div>
    <h1>{{ movie?.title }}</h1>
    <img :src="`https://image.tmdb.org/t/p/original${movie?.poster_path}`" alt="">
    <p>{{ movie?.vote_average }}</p>
    <p>{{ movie?.release_date }}</p>    
    <p>{{ movie?.overview }}</p>

    <div class="col">
      <div v-if="logedin" class="row align-items-center">
        <ion-icon size="large" v-if="is_liked_conition" @click="toggleLike" name="heart" id="heart"></ion-icon>
        <ion-icon size="large" v-if="!is_liked_conition" @click="toggleLike" name="heart"></ion-icon>
      </div>
    </div>

    <form @submit.prevent="createComment">
      <input type="text" v-model="comment_create">
      <input type="submit" value="작성">
    </form>
    <CommentsList
    :comments="comments"
    
    />
  </div>
</template>

<script>
import axios  from 'axios'
import CommentsList from '@/components/CommentsList'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailView',
  components: {
    CommentsList
  },
  data() {
    return{
      movie: null,
      comment_create: null
    }
  },
  computed: {
    movie_info() {
      return this.movie
    },
    comments() {
      return this.$store.state.movie_comments
    },
    is_liked_conition() {
      if (this.$store.state.logedin_user) {
        if (this.movie_info) {
          return this.movie_info.like_users.includes(this.$store.state.logedin_user.pk)
        }
      }
      return false 
    },
    logedin() {
      return this.$store.state.logedin_user
    }
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${this.$route.params.id}`
      })
      .then((response) => {
        this.movie = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getMovieComments() {
      const movie_id = this.$route.params.id
      this.$store.dispatch('getMovieComments', movie_id)
    },
    createComment() {
      const content = this.comment_create
      const user = this.$store.state.logedin_user.pk
      const movie = this.$route.params.id

      const payload = {
        content,
        user,
        movie
      }
      this.$store.dispatch('createComment', payload)
      this.comment_create = null

    },
    toggleLike() {
      const movie_id = this.movie.id
      axios({
        method: 'post',
        url: `${API_URL}/movies/${movie_id}/likes/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
      .then(() => {
        this.getMovieDetail()
      })
      .catch((error) => {
        console.log(error)
      })
    },
  },
  created() {
    this.getMovieDetail()
    this.getMovieComments()
  }
}
</script>

<style>
#heart {
  color: red;
}
</style>