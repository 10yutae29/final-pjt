<template>
  <div>
    <h1>MoviesList.vue</h1>
    <div>
      <span>평점</span>  <span @click="scoreUp">위</span> <span @click="scoreDown">아래</span> |
      <span>제목</span>  <span @click="titleUp">위</span> <span @click="titleDown">아래</span> |
      <span>개봉일</span>  <span @click="dateUp">위</span> <span @click="dateDown">아래</span>
    </div>
    <div>
      <input type="text" v-model="search" @keyup="searchFilter">
    </div>
    <div class="row justify-content-around">
      <MoviesListItem
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import MoviesListItem from '@/components/MoviesListItem'
export default {
  name: 'MoviesList',
  components:{
    MoviesListItem
  },
  data() {
    return {
      movies: null,
      search: ''
    }
  },
  methods: {
    getMovies() {
      const movies = this.$store.state.movies
      this.movies = movies
    },
    searchFilter() {
      const word = this.search.toLowerCase()
      const movies = this.$store.state.movies
      this.movies = movies.filter(movie => movie.title.toLowerCase().includes(word))
    },
    scoreUp() {
      const movies = this.$store.state.movies
      this.movies = movies.sort(function(a, b) {
        return b.vote_average - a.vote_average
      })
    },
    scoreDown() {
      const movies = this.$store.state.movies
      this.movies = movies.sort(function(a, b) {
        return a.vote_average - b.vote_average
      })
    },
    titleUp() {
      const movies = this.$store.state.movies
      this.movies = movies.sort(function(a, b) {
        if (a.title > b.title) return 1;
    else if (b.title > a.title) return -1;
    else return 0;
      })
    },
    titleDown() {
      const movies = this.$store.state.movies
      this.movies = movies.sort(function(a, b) {
        if (a.title > b.title) return -1;
    else if (b.title > a.title) return 1;
    else return 0;
      })
    },
    dateUp() {
      const movies = this.$store.state.movies
      this.movies = movies.sort(function(a, b) {
        return new Date(b.release_date) - new Date(a.release_date)
      })
    },
    dateDown() {
      const movies = this.$store.state.movies
      this.movies = movies.sort(function(a, b) {
        return new Date(a.release_date) - new Date(b.release_date)
      })
    }
  },
  created() {
    this.getMovies()
  }
}
</script>

<style>
#ItemContainer {
  
}
</style>