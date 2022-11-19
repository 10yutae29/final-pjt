<template>
  <div>
    <h1>전체 영화</h1>
    <div>
      <span>평점</span>  <span @click="scoreUp">위</span> <span @click="scoreDown">아래</span> |
      <span>제목</span>  <span @click="titleUp">위</span> <span @click="titleDown">아래</span> |
      <span>개봉일</span>  <span @click="dateUp">위</span> <span @click="dateDown">아래</span>
    </div>
    <div class="searchbody my-5">
      <div class="search">
        <div class="icon" @click="activateSearch"></div>
        <div class="input">
          <input type="text" placeholder="Search" v-model="search" @input="searchFilter">
        </div>
      </div>
    </div>

    <div class="row justify-content-around">
      <MoviesListItem
      v-for="movie in movieGo"
      :key="movie.id"
      :movie="movie"
      @likechanged="getMovieData"
      />
    </div>
  </div>
</template>

<script>
import MoviesListItem from '@/components/MoviesListItem'
export default {
  name: 'MoviesView',
  components:{
    MoviesListItem
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    movieGo(){
      return this.$store.state.movies_filtered
    }
  },
  methods: {
    getMovieData(){
      this.$store.dispatch('getMovies')
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
    },
    activateSearch() {
      
      const search = document.querySelector('.search')
      search.classList.toggle('active')
    }
  },
  created() {
  }
}

</script>

<style>
.searchbody{
  display: flex;
  justify-content: center;
  align-items: center;

}

.search {
  position: relative;
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 60px;
  transition: 0.5s;
  overflow:hidden;
}

.search.active {
  width: 360px;
}

.search .icon{
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;;
  cursor: pointer;
}
.search .icon::before{
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  border: 3px solid rgb(225, 36, 36);
  border-radius: 50%;
  transform: translate(-4px, -4px);
}

.search .icon::after{
  content: '';
  position: absolute;
  width: 3px;
  height: 12px;
  background: rgb(225, 36, 36);
  transform: translate(6px, 6px) rotate(315deg);
}
.search .input{
  position: relative;
  width: 300px;
  height: 60px;
  left: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.search .input input {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 18px;
  padding: 10px 0;
  background: #fff;
}


</style>
