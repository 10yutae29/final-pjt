<template>
  <div id="app">
    <nav>
      <router-link to="/moviesview">MoviesView</router-link> |
      <router-link to="/recommendview">RecommendView</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    getMovies() {
      this.$store.dispatch('getMovies')
    }
  },
  created() {
    this.getMovies()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background: rgb(255, 255, 255);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
