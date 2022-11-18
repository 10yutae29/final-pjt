<template>
  <div>
    <h1>{{ movie?.title }}</h1>
    <img :src="`https://image.tmdb.org/t/p/original${movie?.poster_path}`" alt="">
    <p>{{ movie?.vote_average }}</p>
    <p>{{ movie?.release_date }}</p>    
    <p>{{ movie?.overview }}</p>
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
    comments() {
      console.log(this.$store.state.movie_comments)
      return this.$store.state.movie_comments
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
      console.log(user)
      axios({
        method: 'post',
        url: `${API_URL}/community/comment/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
        data: {
          content,
          user,
          movie,
        },
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
      this.comment_create = null
      this.getMovieComments()
      this.$router.push(`/moviesview/${this.$route.params.id}`)
    }
  },
  created() {
    this.getMovieDetail()
    this.getMovieComments()
  }
}
</script>

<style>

</style>