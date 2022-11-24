<template>
  <div :class="[`random-item${movie.id}`]" id="randomitem-grid">
    <div class="poster-box">
      <img @click="[sendPicked(), selected()]" id="poster" :src="`https://image.tmdb.org/t/p/original${movie?.poster_path}`" alt="">
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
      const movie_id = this.movie.id
      this.$emit('movie-plus', movie_id)

    },
    selected(){
      const selected_box = document.querySelector(`.random-item${this.movie.id}`)
      // if selected_box.classList.contains('selected-style') {

      // }
      selected_box.classList.toggle('selected-style')
    }
  },
  created() {
  }
}
</script>

<style>
#randomitem-grid{
  width: 100%;
  padding: 1vh 1vh 1vh 1vh;
  border-radius: 5px;
}


.random-item{
  width: 100%;
}

.poster-box{
  width: 100%;
  height: 100%;
}

#poster{
  /* width: 100% */
  height: 100%;
  overflow: hidden;
  border: solid 1px;
  border-radius: 5px;
  width: 100%;
  object-fit: cover;

}

.selected-style{
  background: rgba(229, 255, 0, 0.5);
  backdrop-filter: blur(50px);
}

</style>