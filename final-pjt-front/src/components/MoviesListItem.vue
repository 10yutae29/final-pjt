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
                <ion-icon size="large" v-if="!IsLiked" @click="toggleLike" name="heart" id="unheart"></ion-icon>
                <ion-icon size="large" v-if="IsLiked" @click="toggleLike" name="heart" id="heart"></ion-icon>
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
      isLiked: false
    }
  },
  computed: {
    IsLiked() {
      return  this.isLiked
    }
  },
  methods: {
    toggleLike() {
      // this.isLiked = !this.isLiked
      const movie_id = this.movie.id
      // this.$store.dispatch('toggleLike', movie_id)
      // console.log(this.isLiked)
      // console.log(this.movie.like_users)
      // console.log(this.$store.state.logedin_user.pk)
      // console.log(this.movie.like_users.includes(this.$store.state.logedin_user.pk))
      axios({
        method: 'post',
        url: `${API_URL}/movies/${movie_id}/likes/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
      .then((response) => {
        // const isLiked = response.data.is_liked
        console.log(response.data.is_liked)
        this.isLiked = response.data.is_liked
        // context.commit('GET_IS_LIKED', isLiked)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    goDetail() {
      this.$router.push(`/moviesview/${this.movie.id}/`)
    },
    getIsLiked() {
      const is_liked = this.movie.like_users.includes(this.$store.state.logedin_user.pk)
      this.isLiked = is_liked
      console.log(this.isLiked)

    }
  },
  created() {
    // console.log(this.movie)
    console.log(this.isLiked)

    this.getIsLiked()
    console.log(this.isLiked)
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

#unheart {
  color: black;
}
</style>