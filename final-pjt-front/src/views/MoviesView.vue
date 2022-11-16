<template>
  <div>
    <MoviesList/>
  </div>
</template>

<script>
import MoviesList from '@/components/MoviesList'

export default {
  name: 'MoviesView',
  components: {
    MoviesList
  },
  methods: {
    getMovies(){
      this.$store.dispatch('getMovies')
    }
  },
  created(){
    this.getMovies()
  }
}
</script>

<style>

</style>