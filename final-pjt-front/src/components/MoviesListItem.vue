<template>
  <div id="a" class="col-xxl-3 col-md-6 mb-3">
    <div class="row justify-content-center">
      <div class="w-75 border col-12 card" id="card">
        <img @click="goDetail" class="mt-3" :src="`https://image.tmdb.org/t/p/original${movie?.poster_path}`" alt="">
        <div class="h-25">
          <span class="mt-3 fs-5" id="title" @click="goDetail">{{ movie?.title }}</span>
          <div class="row align-items-center">
            <div class="col-6">
              <span>평점 : {{ movie?.vote_average }}</span>
            </div>
            <div class="col-6">
              <div class="row align-items-center">
                <ion-icon size="large" v-if="is_liked_conition" @click="toggleLike" name="heart" id="heart"></ion-icon>
                <ion-icon size="large" v-if="!is_liked_conition" @click="toggleLike" name="heart"></ion-icon>
                <!-- <ion-icon size="large" @click="toggleLike" name="heart" :class=" { 'is-liked' : is_liked_conition}"></ion-icon> -->

              </div>
            </div>
          </div>
        </div>
      </div>
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
      is_liked: this.movie.like_users.includes(this.$store.state.logedin_user.pk)
    }
  },
  computed: {
    is_liked_conition() {
      return this.movie.like_users.includes(this.$store.state.logedin_user.pk)
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
      .then((response) => {
        console.log(response.data)
        this.isLiked = response.data.is_liked
        this.$emit('likechanged')
        console.log(this.movie)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    goDetail() {
      this.$router.push(`/moviesview/${this.movie.id}/`)
    },
  },
  created() {
    console.log(this.movie.like_users.includes(this.$store.state.logedin_user.pk))
    // console.log(this.$store.state.logedin_user)
  }
}
</script>

<style>
#card {
  background: #155263;
  border: none;
}

#title {
  color: black;
  text-anchor: middle;
  font-size: 1vw;
}

#poster {
  width:50%;
  height: 70%;
}

#heart {
  color: red;
}

.heart {
  color: black
}

#unheart {
  color: black;
}

</style>