<template>
  <div class="moviesview-grid">
    
    <div class="searchbody">
      <div class="search">
        <div class="icon" @click="activateSearch"></div>
        <div class="input">
          <input type="search" placeholder="Search" v-model="search" @input="searchFilter">
        </div>
      </div>
    </div>
    
    <div id="dropdown" class="dropdown">
      <button id="dropdown-btn" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        {{ sorting_genre }}
      </button>
      <ul class="dropdown-menu">
        <!-- <li class="dropdown-item"> -->
          <li
          class="dropdown-item dropdown-text"
          @click="showAll"
          >전체</li>
          <GenresItem
          v-for="genre in genres"
          :key="genre.pk"
          :genre="genre"
          class="dropdown-item dropdown-text"
          />

      </ul>
    </div>


    <div id="moviesview-sort">
      <span @click="scoreUp">평점</span> 
      <span @click="titleUp">제목</span>
      <span @click="dateUp">개봉일</span> 
      <ion-icon v-if="sort_direction_info == 1" name="arrow-up-outline" class="sort" @click="sortUp"></ion-icon> 
      <ion-icon v-if="sort_direction_info == 0" name="arrow-down-outline" class="sort" @click="sortDown"></ion-icon>
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
      search: '',
      sortstatus: 1,
      sort_direction: 0,
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
    },
    sort_direction_info(){
      return this.sort_direction
    }
  },
  methods: {
    getMovieData(){
      this.$store.dispatch('getMovies')
    },
    searchFilter() {
      const word = this.search.toLowerCase()
      this.$store.commit('SEARCH_FILTER', word)
      this.sort_direction = 0

    },
    scoreUp() {
      this.$store.commit('SCORE_UP')
      this.sortstatus = 1
      this.sort_direction = 0
    },
    scoreDown() {
      this.$store.commit('SCORE_DOWN')
      this.sort_direction = 1
    },
    titleUp() {
      this.$store.commit('TITLE_UP')
      this.sortstatus = 2
      this.sort_direction = 0
    },
    titleDown() {
      this.$store.commit('TITLE_DOWN')
      this.sort_direction = 1
    },
    dateUp() {
      this.$store.commit('DATE_UP')
      this.sortstatus = 3
      this.sort_direction = 0
    },
    dateDown() {
      this.$store.commit('DATE_DOWN')
      this.sort_direction = 1
    },
    activateSearch() {
      
      const search = document.querySelector('.search')
      search.classList.toggle('active')
    },
    showAll(){
      this.$store.commit('SHOW_ALL')
    },
    sortDown(){
      if (this.sortstatus == 1){
        this.scoreDown()
      } else if (this.sortstatus == 2){
        this.titleDown()
      } else if (this.sortstatus == 3){
        this.dateDown()
      }
    },
    sortUp(){
      if (this.sortstatus == 1){
        this.scoreUp()
      } else if (this.sortstatus == 2){
        this.titleUp()
      } else if (this.sortstatus == 3){
        this.dateUp()
      }
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
  grid-template-rows: 80px auto;
  font-family: 'Jua', sans-serif;
  padding-top: 50px;
}

#moviesview-title{
  grid-column: 1 / span 3;
  /* background: rgb(255, 255, 255); */
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(8, 0, 53);
}

#moviesview-sort{
  color: rgb(8, 0, 53);
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 17% 17% 26% 20%;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2vw;
  gap: 5%;
  padding-right: 5%;
}

#moviesview-sort .sort{
  width: 80%;
  height: 50%;
  background: white;
  color: #000;
  border-radius: 10px;
}

#moviesview-sort *{
  cursor: pointer
}


.moviesview-items{
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  padding: 50px 20px 20px 20px;
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
  border: solid rgb(0, 0, 0);
  background: rgba(255, 255, 255, 0.705);
  width:50%;
}

.dropdown{
  z-index: 1100;;
}

.dropdown-item{
  cursor: pointer;
}

.dropdown-menu{
  width:50%;
  border: solid rgb(0, 0, 0);
  background: rgba(255, 255, 255, 0.705);
  
}

.dropdown-text{
  text-align: center;
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
  border: 3px solid rgb(24, 0, 163);

  border-radius: 50%;
  transform: translate(-4px, -4px);
}

.search .icon::after{
  content: '';
  position: absolute;
  width: 3px;
  height: 12px;
  /* background: rgb(225, 36, 36); */
  background: rgb(24, 0, 163);
  
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
