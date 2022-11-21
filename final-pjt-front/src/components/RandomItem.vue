<template>
  <div>
    <div class="card" style="width: 18rem;" @click="sendPicked">
      <h1>
        <!-- {{ movie?.title }} -->
      </h1>
      <img :src="`https://image.tmdb.org/t/p/original${movie?.poster_path}`" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name:'RandomItem',
  props: {
    random_movie: Object
  },
  data() {
    return {
      picked: false
    }
  },
  computed: {
    movie() {
      return this.random_movie
    },
    movie_picked() {
      return this.picked
    }
  },
  methods: {
    sendPicked() {
      // this.picked = !this.picked

      // const data = {
      //   to_pick: this.picked,
      //   movie_id: this.movie.pk
      // }
      const movie_id = this.movie.id
      this.$emit('movie-plus', movie_id)

    }
  },
  created() {
    // console.log(this.random_movie)
  }
}
</script>

<style>

</style>