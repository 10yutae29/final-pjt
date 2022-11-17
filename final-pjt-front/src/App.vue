<template>
  <div id="app">
    <h1>Movie 5range</h1>
    <nav>
      <router-link to="/moviesview">전체 영화</router-link> |
      <router-link to="/recommendview">영화 추천</router-link> |
      <router-link v-if="!isLogin" to="/loginview">로그인</router-link> <span v-if="!isLogin">|</span>
      <router-link v-if="!isLogin" to="/signupview">회원 가입</router-link> <span v-if="!isLogin">|</span>
      <router-link v-if="isLogin" @click="practice" to="/userview">내정보</router-link>
    </nav>
    <router-view id="view"/>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    practice() {
      console.log(localStorage.getItem('token'))
    }
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
  background: #115264;
}

#view {
  background: #FF6F3C;
}


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #eee;
}

nav a.router-link-exact-active {
  color: #F07B3F;
}
</style>
