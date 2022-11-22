<template>
  <div id="box">
    <div id="card">
      <div id="front">
        <img id="poster" style="display:block; margin:0 auto;"  :src="`https://image.tmdb.org/t/p/original${movie?.poster_path}`" alt="">
      </div>
      <div id="back">
        <div id="movie-info" @click="goDetail">
          <p id="title">{{ movie?.title }}</p>
          <p id="score">평점 : {{ movie?.vote_average }}</p>
          <p id="date">개봉일 : {{ movie?.release_date }}</p>
        </div>
      </div>
    </div>
    <div v-if="logedin">
      <ion-icon size="large" v-if="is_liked_conition" @click="toggleLike" name="heart" id="heart"></ion-icon>
      <ion-icon size="large" v-if="!is_liked_conition" @click="toggleLike" name="heart" id="noheart"></ion-icon>
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
    }
  },
  computed: {
    is_liked_conition() {
      if (this.$store.state.logedin_user) {
        return this.movie.like_users.includes(this.$store.state.logedin_user.pk)
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
      console.log(this.logedin)
      const movie_id = this.movie.id
      axios({
        method: 'post',
        url: `${API_URL}/movies/${movie_id}/likes/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
      .then(() => {
        this.$emit('likechanged')
      })
      .catch((error) => {
        console.log(error)
      })
      console.log(this.is_liked_conition)

    },
    goDetail() {
      this.$router.push(`/moviesview/${this.movie.id}/`)
    },
  },
  created() {
  
  }
}
</script>

<style>
#box{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 17vw;
  perspective: 1100px;
}

#poster{
  /* width: 100% */
  height: 100%;
  border: solid 1px;
  /* border-radius: 5px; */

}

#card{
  width: 100%; 
  height: 100%; 
  position: relative;
  transition: .8s;
  transform-style: preserve-3d;
}

#front, #back {
  position: absolute;
  width: 100%; 
  height: 100%;
  backface-visibility: hidden;
}

#front{

}

#back { 
  /* background: rgb(255, 255, 255);  */
  transform: rotateY(180deg);

}

#movie-info {
  background: rgb(255, 255, 255);
  width: 80%;
  height: 100%;
  overflow: hidden;
  border: solid 1px;
  border-radius: 5px;
  display: flex;
  /* flex-wrap: wrap; */
  padding: 5px 5px 5px 5px;
  flex-direction: column;
  margin: 0 auto;
  /* flex-direction: column; */
  /* margin: 5px 5px 5px 5px; */
}

#title{
  font-weight: bold;


}

#score{

  font-weight: bold;

}

#date{

  position: relative;
  font-weight: bold;
}

#card:hover {
  transform: rotateY(180deg);
}


#heart {
  color: red;
}

.heart {
  color: black
}

#noheart {
  color: black;
}


</style>