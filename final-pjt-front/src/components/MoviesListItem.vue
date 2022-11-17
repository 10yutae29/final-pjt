<template>
  <div id="a" class="col-xxl-3 col-md-6 mb-3" @click="goDetail">
    <div class="row justify-content-center">
      <div class="w-75 border col-12 card" id="card">
        <img class="mt-3" :src="`https://image.tmdb.org/t/p/original${movie?.poster_path}`" alt="">
        <div class="h-25">
          <p class="mt-3 fs-5" id="title">{{ movie?.title }}</p>
          <div class="row align-items-center">
            <div class="col-6">
              <span>평점 : {{ movie?.vote_average }}</span>
            </div>
            <div class="col-6">
              <div class="row align-items-center">
                <ion-icon size="large" v-if="!isLiked" @click="doLike" name="heart" id="unheart"></ion-icon>
                <ion-icon size="large" v-if="isLiked" @click="cancelLike" name="heart" id="heart"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    doLike() {
      this.isLiked = true
    },
    cancelLike() {
      this.isLiked = false
    },
    goDetail() {
      this.$router.push(`/moviesview/${this.movie.id}`)
    }
  }
}
</script>

<style>
#card {
  background: #fdb268;
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