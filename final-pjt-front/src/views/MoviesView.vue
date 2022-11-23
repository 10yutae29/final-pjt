<template>
  <div class="moviesview-grid">
    
    <div id="moviesview-title">
      <h1>전체 영화</h1>
    </div>
    
    
    <div id="dropdown" class="dropdown">
      <button id="dropdown-btn" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        {{ sorting_genre }}
      </button>
      <ul class="dropdown-menu">
        <!-- <li class="dropdown-item"> -->
          <li
          class="dropdown-item"
          @click="showAll"
          >전체</li>
          <GenresItem
          v-for="genre in genres"
          :key="genre.pk"
          :genre="genre"
          class="dropdown-item"
          />

      </ul>
    </div>

    <div class="searchbody">
      <div class="search">
        <div class="icon" @click="activateSearch"></div>
        <div class="input">
          <input type="search" placeholder="Search" v-model="search" @input="searchFilter">
        </div>
      </div>
    </div>

    <div id="moviesview-sort">
      <span>평점</span>  <span @click="scoreUp" style="cursor: pointer;">위 </span> <span @click="scoreDown" style="cursor: pointer;">아래 </span> |
      <span>제목</span>  <span @click="titleUp" style="cursor: pointer;">위 </span> <span @click="titleDown" style="cursor: pointer;">아래 </span> |
      <span>개봉일</span>  <span @click="dateUp" style="cursor: pointer;">위 </span> <span @click="dateDown" style="cursor: pointer;">아래 </span>
    </div>

    <div class="moviesview-items">
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
import GenresItem from '@/components/GenresItem'

export default {
  name: 'MoviesView',
  components:{
    MoviesListItem,
    GenresItem
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    movieGo(){
      return this.$store.state.movies_filtered
    },
    genres() {
      return this.$store.state.genres
    },
    sorting_genre(){
      return this.$store.state.sorting_genre
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
    },
    showAll(){
      this.$store.commit('SHOW_ALL')
    }
  },
  created() {
    this.showAll()
  }
}

</script>

<style>
.searchbody{
  display: flex;
  justify-content: center;
  align-items: center;

}

.moviesview-grid{
  display: grid;
  grid-template-columns: 30% 40% 30%;
  grid-template-rows: 100px 80px auto;
}

#moviesview-title{
  grid-column: 1 / span 3;
  /* background: rgb(255, 255, 255); */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

#moviesview-sort{
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.moviesview-items{
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  padding: 20px;
  column-gap: 2.5%;
  row-gap: 20px;
}

#movie-item-box{
  
  display: flex;
  justify-content: start;
  align-content: flex-start;
  flex-wrap: wrap;
  align-content: space-between;
}



li {
  cursor: pointer;
}

#dropdown{
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;

}

#dropdown-btn{
  color: black;
  border: solid white;
  background: white;
  
}

.dropdown{
  z-index: 1100;;

}

.dropdown-item{
  cursor: pointer;

}

.search {
  position: relative;
  width: 60px;
  height: 60px;
  background: rgb(255, 255, 255);
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
  background: rgb(255, 255, 255);
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
  /* border: 3px solid rgb(225, 36, 36); */
  border: 3px solid rgb(255, 0, 0);

  border-radius: 50%;
  transform: translate(-4px, -4px);
}

.search .icon::after{
  content: '';
  position: absolute;
  width: 3px;
  height: 12px;
  /* background: rgb(225, 36, 36); */
  background: rgb(255, 19, 19);
  transform: translate(6px, 6px) rotate(315deg);
}
.search .input{
  position: relative;
  width: 300px;
  /* height: 60px; */
  top:30%;
  left: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.search .input input {
  position: absolute;
  top: 0;
  width: 90%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 18px;
  padding: 10px 0;
  background: rgb(255, 255, 255);
  color: #000;
  
}


</style>
