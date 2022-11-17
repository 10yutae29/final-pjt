<template>
  <div>
    <h1>DetailView</h1>
    <p>{{ movie.title }}</p>
    <img src="`https://image.tmdb.org/t/p/original${movie?.poster_path}`" alt="">
    <p>{{ movie.vote_average }}</p>
    <p>{{ movie.release_date }}</p>    
    <p>{{ movie.overview }}</p>
  </div>
</template>

<script>
import axios  from 'axios'


const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailView',
  data() {
    return{
      movie: null
    }
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${this.$route.params.id}`
      })
      .then((response) => {
        console.log(response)
        this.movie = response.data
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