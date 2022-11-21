<template>
  <div>
    <div>
      <LikeMoviesItem
      v-for="liked_movie_info in liked_movies_info"
      :key="liked_movie_info.pk"
      :liked_movie_info="liked_movie_info"
      />
    </div>
  </div>
</template>

<script>
import LikeMoviesItem from '@/components/LikeMoviesItem';

export default {
  name: 'LikeMovieList',
  components: {
    LikeMoviesItem
  },
  props: {
    liked_movies:Array
  },
  computed: {
    liked_movies_info() {
      return this.$store.state.movies.filter(movie => this.liked_movies.includes(movie.id))
    }
  }
}
</script>

<style>

</style>