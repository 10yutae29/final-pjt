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

    <label>
      <select name="genre-filter" id="genre-filter" @change="getMovieData">
        <option value=0>전체</option>
        <option v-for="genre in genres"
          :key="genre.pk"
          :value = "genre.id"
          class="dropdown-item dropdown-text"
          >{{ genre.name }}
        </option>
      </select> 
    </label>

    <div id="moviesview-sort">
      <button @click="sortMovie" value="vote_average">평점</button> 
      <button @click="sortMovie" value="title">제목</button>
      <button @click="sortMovie" value="release_date">개봉일</button> 
      <ion-icon v-if="sort_direction == 0" name="arrow-up-outline" class="sort" @click="sortUpDown"></ion-icon> 
      <ion-icon v-if="sort_direction == 1" name="arrow-down-outline" class="sort" @click="sortUpDown"></ion-icon>
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

export default {
  name: 'MoviesView',
  components:{
    MoviesListItem,
  },
  data() {
    return {
      search: '',
      sort_direction: 0,
      sort_data: 'vote_average',
      filtered_genre: '0'
    }
  },
  computed: {
    movieGo(){
      return this.$store.state.movies
    },
    genres() {
      return this.$store.state.genres
    },
  },
  methods: {
    getMovieData(event){
      if(event){
        this.filtered_genre = event.target.value
        const datas = {
          genre:event.target.value,
          sort: 'vote_average',
          sort_direction: this.sort_direction,
        }
        console.log(datas)
        this.$store.dispatch('getMovies',datas)
      } else{
        const datas = {
          genre: this.filtered_genre,
          sort: this.sort_data,
          sort_direction: this.sort_direction,
        }
        this.$store.dispatch('getMovies',datas)
      }
    },
    sortMovie(event){
      this.sort_data = event.target.value
      this.getMovieData()
    },
    sortUpDown(){
      if(this.sort_direction === 0) {
        this.sort_direction = 1
      } else {
        this.sort_direction = 0
      }
      this.getMovieData()
    },
    searchFilter() {
      const word = this.search.toLowerCase()
      this.$store.commit('SEARCH_FILTER', word)
      this.sort_direction = 0
    },
    activateSearch() {
      const search = document.querySelector('.search')
      search.classList.toggle('active')
    },
  },
  created() {
    this.getMovieData()
  }
}

</script>

<style>
.searchbody{
  display: flex;
  justify-content: center;
  align-items: center;

}

#moviesview-sort *:hover{
  color: rgb(255, 255, 255);  
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
  background: rgba(255, 255, 255, 0.879);
  width:50%;
  height: 100%;
  font-size: 1.2vw;

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
  background: rgba(255, 255, 255, 0.879);
  font-size: 1.2vw;
  
  
}

.dropdown-text{
  text-align: center;
}

.dropdown-text:hover{
  color: rgb(107, 43, 255);
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
