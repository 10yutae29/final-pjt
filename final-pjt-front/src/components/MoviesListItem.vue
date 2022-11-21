<template>
  <div id="box">
    <img id="poster" class="img-fluid" @click="goDetail" :src="`https://image.tmdb.org/t/p/original${movie?.poster_path}`" alt="">
    <!-- <div>
      <span>평점 : {{ movie?.vote_average }}</span>
    </div> -->
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
}

#poster{
  /* width: 100% */
  height: 100%;
  overflow: hidden;
  border: solid 1px;
  border-radius: 5px;
  margin: 5px 5px 5px 5px;
}

#card{
  border: solid;
  border-radius: 10px ;
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