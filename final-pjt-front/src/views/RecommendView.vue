<template>
  <div>
    <h1>영화 추천</h1>
    <!-- 이 div에는 selected_genres가 있을때 추천 영화를 출력 -->
    <div v-if="selected_genres">
      <MoviesListItem/>
    </div>

    <!-- 이 div에는 selected_genres가 비었을 때 영화 선택 -->
    <div v-if="!selected_genres">
      <button @click="getRandomMovies">다른 영화</button>
      <div>
      <RandomItem
      v-for="random_movie in random_movies"
      :key="random_movie.id"
      :random_movie="random_movie"

      />
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
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
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  data() {
    return {
      random_movies: null
    }
  },
  methods: {
    getRandomMovies(){
      const movies = this.$store.state.movies
      const random_movies = _.sampleSize(movies, 9)
      this.random_movies = random_movies
      console.log(this.random_movies)
    },
    getSelectedGenres() {
      this.$store.dispatch('getSelectedGenres')
    }
  },
  created() {
    this.getSelectedGenres()
    if (!this.selected_genres) {
      this.getRandomMovies()
    }

  }
}
</script>

<style>

</style>