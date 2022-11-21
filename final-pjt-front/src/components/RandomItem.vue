<template>
  <div id="box">
    <img id="poster" class="img-fluid" :src="`https://image.tmdb.org/t/p/original${movie?.poster_path}`" alt="">
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
</style>