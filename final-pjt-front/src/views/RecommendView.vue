<template>
  <div class="recommendview-grid">
    <div class="recommendview-name">
      <span>영화 추천</span>
    </div>


    <!-- 이 div에는 selected_genres가 있을때 추천 영화를 출력 -->
    <div class="recommendview-items" v-if="recommend_movies.length">
      <MoviesListItem
      v-for="movie in recommend_movies"
      :key="movie.id"
      :movie="movie"
      />
    </div>

    <!-- 이 div에는 selected_genres가 비었을 때 영화 선택 -->
    <div class="recommendview-random-grid" v-if="!recommend_movies.length">
      <div class="reset-random">
        <button @click='getRandomMovies'>다른 영화</button>
      </div>
      <div class="recommendview-random-items">
        <RandomItem
        v-for="random_movie in random_movies"
        :key="random_movie.id"
        :random_movie="random_movie"
        @movie-plus="makeMovieList"
        />
      </div>
      <div class="random-submit">
        <button @click="goGenres">제출</button>
      </div>
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

    isLogin() {
      return this.$store.getters.isLogin
    },
    random_movies() {
      return this.$store.state.random_movies
    },
    recommend_movies() {
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
    },
    goGenres() {
      this.$store.dispatch('goGenres', this.picked_movies)
    },
  },
  created() {
    this.getSelectedGenres()
  },
}
</script>

<style>
.recommendview-grid{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100px auto;
}

.recommendview-name{
  display: flex;
  justify-content: center;
  align-items: center;
}

.recommendview-name span{
  color: #fff;
  font-size: 3vw;
}

.recommendview-items{
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  padding: 20px;
  column-gap: 2.5%;
  row-gap: 20px;
}

.recommendview-random-items{
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  padding: 20px;
  column-gap: 2.5%;
  row-gap: 20px;
}

.recommendview-random-grid{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 200px auto 200px;
  justify-content: center;
}

.reset-random{
  display: flex;
  justify-content: center;
  align-items: center;
}

.random-submit{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>