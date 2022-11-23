<template>
  <div >
    <div @click="goDetail">
      <!-- <h1>{{ liked_movie_info?.title }}</h1> -->
      <img :src="`https://image.tmdb.org/t/p/original${liked_movie_info?.poster_path}`" alt=""  id="poster">
    </div>
  </div>
</template>

<script>
export default {
  name: 'LikeMoviesItem',
  props:{
    liked_movie_info:Object
  },
  methods: {
    goDetail(){
      this.$router.push(`/moviesview/${this.liked_movie_info.id}/`)
    }
  }
}
</script>

<style>

</style>