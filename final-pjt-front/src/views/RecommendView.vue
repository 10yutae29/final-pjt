<template>
  <div>
    <h1>영화 추천</h1>
    <!-- 이 div에는 selected_genres가 있을때 추천 영화를 출력 -->
    <div v-if="genres_length">
      <h1>장르가 있어용</h1>
      <MoviesListItem
      v-for="movie in recommend_movies"
      :key="movie.id"
      :movie="movie"
      />
    </div>

    <!-- 이 div에는 selected_genres가 비었을 때 영화 선택 -->
    <div v-if="!genres_length">
      <button id="reset-random" @click='getRandomMovies'>다른 영화</button>
      <div id="randomcase">
        <RandomItem
        v-for="random_movie in random_movies"
        :key="random_movie.id"
        :random_movie="random_movie"
        @movie-plus="makeMovieList"
        />
      </div>
      <button @click="goGenres"><h1>제출</h1></button>
    </div>

  </div>
</template>

<script>
// import _ from 'lodash'
import RandomItem from '@/components/RandomItem'
import MoviesListItem from '@/components/MoviesListItem'

export default {
  name: 'RecommendView',
  components: {
    RandomItem,
    MoviesListItem
  },
  computed: {
    selected_genres(){
      return this.$store.state.selected_genres
    },
    genres_length(){
      return this.$store.state.genres_length
    },
    isLogin() {
      return this.$store.getters.isLogin
    },
    random_movies() {
      return this.$store.state.random_movies
    },
    recommend_movies() {
      // console.log(this.$store.state.recommend_movies)
      return this.$store.state.recommend_movies
    },
  },
  data() {
    return {
      picked_movies: []
    }
  },
  methods: {
    getRandomMovies(){
      this.$store.dispatch('getRandomMovies')
      this.picked_movies = []
      // console.log(this.picked_movies)
    },
    getSelectedGenres() {
      this.$store.dispatch('getSelectedGenres')
    },
    makeMovieList(movie_id) {
      if (this.picked_movies.includes(movie_id)) {
        this.picked_movies.splice(this.picked_movies.indexOf(movie_id),1)
      } else {
        this.picked_movies.push(movie_id)     
      }
      console.log(this.picked_movies)
    },
    goGenres() {
      this.$store.dispatch('goGenres', this.picked_movies)
    },
  },
  created() {
    this.getSelectedGenres()
    
  },
  // updated() {
  //   if (!this.genres_length) {
  //     // this.getRandomMovies()
  //   }
  // }
}
</script>

<style>
#randomcase {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#reset-random{
  width: 200px;
  padding: 1vw;
  /* font-size: 1vh; */
}
</style>