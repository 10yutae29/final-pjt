<template>
  <div>
    <h1>MoviesList.vue</h1>
    <div>
      <span>평점</span>  <span @click="scoreUp">위</span> <span @click="scoreDown">아래</span> |
      <span>제목</span>  <span @click="titleUp">위</span> <span @click="titleDown">아래</span> |
      <span>개봉일</span>  <span @click="dateUp">위</span> <span @click="dateDown">아래</span>
    </div>
    <div>
      <input type="text" v-model="search" @input="searchFilter">
    </div>
    <div class="row justify-content-around">
      <MoviesListItem
      v-for="movie in movieGo"
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
  computed: {
    movieGo(){
      return this.$store.state.movies_filtered
    }
  },
  methods: {
    getMovies() {
      const movies = this.$store.state.movies
      this.movies = movies
      console.log(this.movies)
    },
    searchFilter() {
      const word = this.search.toLowerCase()
      this.$store.commit('SEARCH_FILTER', word)
    },
    scoreUp() {
      this.$store.commit('SCORE_UP')
    },
    scoreDown() {
      this.$store.commit('SCORE_DOWN')
    },
    titleUp() {
      this.$store.commit('TITLE_UP')
    },
    titleDown() {
      this.$store.commit('TITLE_DOWN')
    },
    dateUp() {
      this.$store.commit('DATE_UP')
    },
    dateDown() {
      this.$store.commit('DATE_DOWN')
    }
  },
  created() {
    this.getMovies()
  }
}
</script>

<style>

</style>