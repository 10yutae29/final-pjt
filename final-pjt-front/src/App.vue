<template>
  <div id="app">
    <div id="title">
      <div class="liquid" @click="goMain">
        <h1>SEE원한 영화</h1>
        <h1>SEE원한 영화</h1>
        <h1>SEE원한 영화</h1>
        <h1>SEE원한 영화</h1>
      </div>
    </div>
    
    <div id="navbar">
      
      <router-link to="/moviesview">전체영화</router-link> 
      <router-link to="/recommendview">영화추천</router-link>  
      <router-link v-if="!isLogin" to="/loginview">로그인</router-link> 
      <router-link v-if="!isLogin" to="/signupview">회원가입</router-link>
      <span>
        <router-link v-if="isLogin" to="/userview">내정보</router-link> 
      </span>
      <a id="logout" v-if="isLogin" href="#" @click="logOut">로그아웃</a>
    </div>
    
    <div id="content"><router-view/></div>
    
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
    // checkAuth(){
    //   if (!this.isLogin) {
    //     window.alert('로그인 페이지로 이동합니다.')
    //     this.$router.push('/loginview')
    //   }
    // },
    getMovieData(){
      this.$store.dispatch('getMovies')
    },
    // getLoginUser() {
    //   this.$store.dispatch('getLoginUser')
    // },
    logOut() {
      this.$store.commit('LOG_OUT')
      // this.$store.dispatch('logOut')
    },
    goMain() {
      this.$router.push('/')
    },
    getGenres(){
      this.$store.dispatch('getGenres')
    }
  },
  created() {
    this.getMovieData()
    this.getGenres()
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Jua&display=swap');
</style>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background: #82b1ff;
  height: 100%; */
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: 200px auto;
  margin: 0;
  padding: 0;
  font-family: 'Jua', sans-serif;
  /* height: 100vh; */
}

#title {
  background: #0c032e;
  display: flex;
  justify-content: center;
  align-items: center;
}

#navbar {
  background: #0c032e;
  display: flex;
  justify-content: right;
  align-items: center;
  
}

#navbar a {
  text-decoration: none;
  color: white;
  font-size: 2vw;
  font-family: 'Jua', sans-serif;
  margin-right: 3vw;
}

#content {
  /* background: url(https://cdn.pixabay.com/photo/2014/11/30/17/15/theater-551797__340.jpg) no-repeat; */
  /* background: radial-gradient(white , rgba(47, 116, 206, 0.795)); */
  background: #2195f37c;
  /* background: #484848; */
  grid-column: 1 / -1;
  display: fixed;
  min-height: 100vh;
  background-size: cover;
  background-attachment: fixed;
}

.liquid{
  padding-left: 5%;
  position: relative;
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* top: 50%; */
  /* background: #183954; */
}
.liquid h1{
  position: absolute;
  font-size: 4.5vw;
  font:bold;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-family: 'Black Han Sans', sans-serif;
  cursor: pointer;
  margin-bottom: 0;
}
.liquid h1:nth-child(1)
{
  color: #fff;
  text-shadow: -2px 2px 0px #183954,
  -4px 4px 0px #183954,
  -6px 6px 0px #183954,
  -8px 8px 0px #183954,
  -18px 18px 20px rgba(0,0,0,0.5),
  -18px 18px 50px rgba(0,0,0,0.5);
}
.liquid h1:nth-child(2) {
  color: #2196f3;
  /* color: #606060; */
  opacity: 0.5;
  animation: animate 3s ease-in-out infinite;
}
.liquid h1:nth-child(3) {
  color: #2196f3;
  opacity: 0.5;
  animation: animate 5s ease-in-out infinite;
}
.liquid h1:nth-child(4) {
  color: #2196f3;
  opacity: 0.7;
  animation: animate 11s ease-in-out infinite;
}
@keyframes animate
{
  0%, 100%{
    clip-path: polygon(0 50%, 5% 37%, 13% 25%, 23% 16%, 33% 20%, 42% 32%, 50% 50%, 56% 61%, 65% 71%, 76% 78%, 89% 70%, 95% 60%, 100% 50%, 100% 99%, 0 100%);
  }
  25%{
    clip-path: polygon(0 80%, 10% 73%, 18% 64%, 25% 50%, 32% 33%, 41% 20%, 50% 15%, 59% 19%, 68% 31%, 75% 50%, 84% 64%, 92% 71%, 100% 78%, 100% 99%, 0 100%);
  }
  50%{
    clip-path: polygon(0 50%, 7% 63%, 13% 75%, 23% 84%, 33% 79%, 43% 68%, 50% 50%, 58% 39%, 67% 29%, 76% 22%, 88% 30%, 95% 40%, 100% 50%, 100% 99%, 0 100%);
  }
  75%{
    clip-path: polygon(0 19%, 10% 25%, 19% 35%, 25% 50%, 32% 67%, 40% 80%, 50% 85%, 59% 80%, 68% 67%, 75% 50%, 84% 36%, 92% 29%, 100% 23%, 100% 99%, 0 100%);
  }
}
</style>
