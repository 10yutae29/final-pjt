<template>
  <div id="movieslistitem-grid">
    <div></div>
    <div class="flip">  
      <div class="card">
    <!-- 앞면 -->
        <div class="front">
          <img id="poster" :src="`https://image.tmdb.org/t/p/original${movieItemInfo?.poster_path}`" alt="">
        </div>
    <!-- 뒷면 -->
        <div class="back">
          <div>
            <div id="movie-info" >
              <p id="movielistitem-title">{{ movieItemInfo?.title }}</p>
              <p id="score">평점 : {{ movieItemInfo?.vote_average }}</p>
              <p id="date">개봉일 : {{ movieItemInfo?.release_date }}</p>
            </div>
              <div v-if="logedin">
              <ion-icon size="large" v-if="is_liked_conition" @click="toggleLike" name="heart" id="heart"></ion-icon>
              <ion-icon size="large" v-if="!is_liked_conition" @click="toggleLike" name="heart" id="noheart"></ion-icon>
            </div>
            <button @click="goDetail">영화 세부 정보</button>
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
      return new this.movie.release_date
    }
  },
  methods: {
    toggleLike() {
      // console.log(this.logedin)
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
      })
      .catch((error) => {
        console.log(error)
      })
      // console.log(this.is_liked_conition)

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
#movieslistitem-grid{
  display: grid;
  grid-template-columns: 10% 80% 10%;
}

.flip { 
  width: 100%;
  height: 100%;
  perspective: 1100px;
}

#poster{
  height: 100%;
  width:100%;
  object-fit: cover;
}

.card {
  width: 100%; 
  height: 100%; 
  position: relative;
  transition: .4s;
  transform-style: preserve-3d;
}	

.front, .back {
  position: absolute;
  width: 100%; 
  height: 80%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
}

.front {
  background: rgb(255, 255, 255); 

}
#movie-info {
  background: rgb(255, 255, 255);
  /* width: 80%; */
  height: 100%;
  overflow: hidden;
  /* border: solid 1px; */
  /* border-radius: 5px; */
  display: flex;
  /* flex-wrap: wrap; */
  padding: 5px 5px 5px 5px;
  flex-direction: column;
  margin: 0 auto;

}

.back { 
  background: rgb(255, 255, 255); 
  transform: rotateY(180deg);

}


.flip:hover .card {
  transform: rotateY(180deg);
}

#movielistitem-title{
  font-weight: bold;

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