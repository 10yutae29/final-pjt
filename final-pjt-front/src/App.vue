<template>
  <div id="app">
    <h1>Movie 5range</h1>
    <nav>
      <router-link to="/moviesview">전체영화</router-link> |
      <router-link to="/recommendview">영화추천</router-link> |
      <router-link v-if="!isLogin" to="/loginview">로그인</router-link> <span v-if="!isLogin">| </span>
      <router-link v-if="!isLogin" to="/signupview">회원가입</router-link>
      <span @click="getLoginUser" >
        <router-link v-if="isLogin" to="/userview">내정보</router-link> <span v-if="isLogin">| </span>
      </span>
      <a id="logout" v-if="isLogin" href="#" @click="logOut">로그아웃</a>
    </nav>
    <!-- 체크한번하자 -->
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
    getLoginUser() {
      this.$store.dispatch('getLoginUser')
    },
    logOut() {
      this.$store.dispatch('logOut')
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

#logout {
  font-weight: bold;
  color: #eee;
}

#logout:hover {
  color: rgb(154, 154, 250);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #eee;
  text-decoration: none;
}

nav a:hover {
  color: rgb(154, 154, 250);

}

nav a.router-link-exact-active {
  color: #F07B3F;
}
</style>
