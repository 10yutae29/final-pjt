<template>
  <div class="movieslistitem-grid">
    <div></div>
    <div class="flip">  
      <div class="card">
    <!-- 앞면 -->
        <div class="front">
          <img class="poster" v-if="movieItemInfo" :src="`https://image.tmdb.org/t/p/original${movieItemInfo?.poster_path}`" alt="">
          <div class="front-title"><span>{{ movieItemInfo?.title }}</span></div>
          <div class="front-date"><span>{{ movieItemInfo?.release_date }}</span></div>
        </div>
    <!-- 뒷면 -->
        <div class="back">
          <div id="movie-info" >
            <div class="movie-info-item movielistitem-title"><span>{{ movieItemInfo?.title }}</span></div>
            <div class="movielistitem-score movie-info-item"><p>평점 : {{ movieItemInfo?.vote_average }}</p></div>
            <div class="movielistitem-date movie-info-item"><p>개봉일 : {{ movieItemInfo?.release_date }}</p></div>
            <button class="movie-info-item movielistitem-btn" @click="goDetail">DETAIL</button>
            <div class="movie-info-item movielistitem-heart" v-if="logedin">
              <ion-icon size="large" v-if="is_liked_conition" @click="toggleLike" name="heart" id="heart"></ion-icon>
              <ion-icon size="large" v-if="!is_liked_conition" @click="toggleLike" name="heart" id="noheart"></ion-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>

    </div>
            

          
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'MoviesListItem',
  props: {
    movie:Object
  },
  data() {
    return{  
      movieItem: null
    }
  },
  computed: {
    movieItemInfo() {
        return this.movieItem
      },
    is_liked_conition() {
      if (this.$store.state.logedin_user) {
        return this.movieItemInfo?.like_users.includes(this.$store.state.logedin_user.pk)
      } else {
        return false
      }
    },
    logedin() {
      return this.$store.state.logedin_user
    },
    date() {
      const date = new this.movie.release_date.toDateString()
      return date
    }
  },
  methods: {
    toggleLike() {
      const movie_id = this.movie.id
      axios({
        method: 'post',
        url: `${API_URL}/movies/${movie_id}/likes/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
      .then(() => {
        this.getMovieDetail()
        this.$emit()
      })
      .catch((error) => {
        console.log(error)
      })
    },
    goDetail() {
      this.$router.push(`/moviesview/${this.movie.id}/`)
    },
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${this.movie.id}`
      })
      .then((response) => {
        this.movieItem = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
  },
  created() {
    this.getMovieDetail()
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap');
</style>

<style>
.movieslistitem-grid{
  aspect-ratio: 5 / 7 auto ;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  border-radius: 2px;
}

.flip { 
  width: 100%;
  height: 100%;
  perspective: 1100px;
  border-radius: 2px;

}

.poster{
  height: 100%;
  width:100%;
  object-fit: cover;
  border:solid rgba(65, 65, 65, 0.397) 0.1px;
}

.card {
  width: 100%; 
  height: 100%; 
  position: relative;
  transition: .4s;
  transform-style: preserve-3d;
  border: solid black 0.1px;
  border-radius: 2px;

}	

.front, .back {
  position: absolute;
  width: 100%; 
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  padding: 10px 5px 5px 5px;
}

.front {
  background: rgb(245, 245, 245); 
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 70% 20% 10%;
  
}
.front-title, .front-date{
  font-family: 'Nanum Brush Script', cursive;
  text-align: center;
}

.front-title{
  display: flex;
  font-size: 1.5vw;
  justify-content: center;
  rotate: -6deg;
  align-items: center;
}

.front-date{
  font-size: 1.5vw;
  rotate: -5deg;
}

#movie-info {
  background: rgb(255, 255, 255);
  /* width: 80%; */
  height: 100%;
  overflow: hidden;
  display: grid;
  padding-left: 5px;
  padding-right: 5px;
  grid-template-columns: 100%;
  grid-template-rows: 28% 10% 30% 15% 15%;

}

.movie-info-item{
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* left: 50%; */
  font-size: 1vw;
  margin: 0;
  

}

.movie-info-item p{
  margin: 0;


}

.movielistitem-btn{
  justify-content: center;
  font-size: 1vw;
  border-radius: 5px;
  background: black;
  color: white;
}

.movielistitem-btn:hover{
  color: rgb(69, 255, 18);
}

.back { 
  background: rgb(255, 255, 255); 
  height: 100%;
  transform: rotateY(180deg);
}


.flip:hover .card {
  transform: rotateY(180deg);
}

.movielistitem-title{
  font-weight: bold;
  justify-content: center;
}

.movielistitem-score{
  padding-left: 4px;
}

.movielistitem-date{
  padding-left: 4px;
}

.movielistitem-heart{
  justify-content: center;
}

#score{

  font-weight: bold;

}

#date{

  position: relative;
  font-weight: bold;
}




#heart {
  color: red;
  cursor: pointer;

}

.heart {
  color: black;
}

#noheart {
  color: black;
  cursor: pointer;

}


</style>