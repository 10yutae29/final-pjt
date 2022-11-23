<template>
  <div>
    <h3 id="like-movie-list-title">좋아요 누른 영화 목록</h3>
    <div class="row">
  <div  id="like-movies-items">   
      <LikeMoviesItem
      v-for="liked_movie_info in liked_movies_info"
      :key="liked_movie_info.pk"
      :liked_movie_info="liked_movie_info"
      />
    </div>
      
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
#like-movies-items{
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  padding: 20px;
  column-gap: 2.5%;
  row-gap: 20px;
}

#like-movie-list-title{
  text-decoration-line: underline;
  margin-top: 5px;
  color: white;
}

</style>