<template>
  <div>
    {{ genres_data?.name}}
  </div>
</template>

<script>
export default {
  name:'GenresItem',
  props:{
    genre: Object
  },
  computed: {
    genres_data() {
      console.log(this.genre)
      return this.genre
    }
  }
}
</script>

<style>

</style>