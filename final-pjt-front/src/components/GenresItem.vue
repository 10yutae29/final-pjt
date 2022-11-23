<template>
  <div @click="sortGenre">
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
      return this.genre
    }
  },
  methods: {
    sortGenre(){
      this.$store.commit('SORT_GENRE', this.genres_data)
    }
  },
}
</script>

<style>

</style>