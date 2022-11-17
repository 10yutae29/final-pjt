<template>
  <div>
    <h1>{{ movie?.title }}</h1>
    <img :src="`https://image.tmdb.org/t/p/original${movie?.poster_path}`" alt="">
    <p>{{ movie?.vote_average }}</p>
    <p>{{ movie?.release_date }}</p>    
    <p>{{ movie?.overview }}</p>
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
      comments: null
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
      axios({
        method: 'get',
        url: `${API_URL}/community/${this.$route.params.id}`,
      })
      .then((response) => {
        console.log(response)
        // this.comments = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created() {
    this.getMovieDetail()
  }
}
</script>

<style>

</style>