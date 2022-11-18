<template>
  <div>
    <div class="card" style="width: 18rem;">
    <h1>
      {{ random_movie?.title }}
    </h1>
    <img :src="`https://image.tmdb.org/t/p/original${random_movie?.poster_path}`" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name:'RandomItem',
  props: {
    random_movie: Object
  },
  created() {
    console.log(this.random_movie)
  }
}
</script>

<style>

</style>