<template>
  <div id="app">
    <div style="height:150px; margin-bottom: 10px;">
      <div class="liquid" @click="goMain">
            <h1>SEE원한 영화</h1>
            <h1>SEE원한 영화</h1>
            <h1>SEE원한 영화</h1>
            <h1>SEE원한 영화</h1>
      </div>
    </div>
    <nav>
      <router-link to="/moviesview">전체영화</router-link> |
      <router-link to="/recommendview">영화추천</router-link>  |
      <router-link v-if="!isLogin" to="/loginview">로그인</router-link> <span v-if="!isLogin">| </span>
      <router-link v-if="!isLogin" to="/signupview">회원가입</router-link>
      <span>
        <router-link v-if="isLogin" to="/userview">내정보</router-link> <span v-if="isLogin">| </span>
      </span>
      <a id="logout" v-if="isLogin" href="#" @click="logOut">로그아웃</a>
    </nav>
    <!-- 체크한번하자 -->
    <div id="view-part">
      <section>
        <div id="wave"></div>
        <div id="wave"></div>
        <div id="wave"></div>

      </section>
      <router-view id="view"/>
    </div>
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
      console.log(this.$store.state.token)
      console.log(this.$store.state.logedin_user)
      console.log('logout pushed')
      this.$store.commit('LOG_OUT')
      // this.$store.dispatch('logOut')
    },
    goMain() {
      this.$router.push('/')
    }
  },
  created() {
    this.getMovieData()
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background: #71DFE7;

  /* background: #115264; */
}

#view {
  /* background: #F5E8C7; */
}

#view-part{
  background: #F5E8C7;

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
  background: #009DAE;
}

nav a {
  font-weight: bold;
  color: #FFE652;
  text-decoration: none;
}

nav a:hover {
  color: rgb(154, 154, 250);

}

nav a.router-link-exact-active {
  color: #F07B3F;
}

/* 여기서부터 물 스타일 */
.liquid{
  margin-top: 25px;
  position: absolute;
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: center;
  /* align-items: center; */
  background: #183954;
}

.liquid h1{
  position: absolute;
  font-size: 6vw;
  font:bold;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-family: 'Black Han Sans', sans-serif;
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
  opacity: 0.5;
  animation: animate 3s ease-in-out infinite;
}
.liquid h1:nth-child(3) {
  color: #2196f3;
  /* opacity: 0.5; */
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
/* 여기서부터 파도 */
section{
  margin: 0;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: -0.5;
}

section #wave:nth-child(1){
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  background: #4973ff;
  animation: animate2 8s ease-in-out infinite;
}

section #wave:nth-child(2){
  width: 100%;
  height: 100%;
  left: 0;
  opacity: 0.6;
  position: absolute;
  background: #4973ff;
  animation: animate2 7s ease-in-out infinite;
}

section #wave:nth-child(3){
  width: 100%;
  height: 100%;
  left: 0;
  opacity: 0.7;
  position: absolute;
  background: #4973ff;
  animation: animate2 9s ease-in-out infinite;
}


/* section #wave span{
  position: absolute;
  width: 325vh;
  height: 325vh;
  top:0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000;
}

section #wave span:nth-child(1){
  animation: animate2 5s linear infinite;
} */

@keyframes animate2 {
  /* 0%, 100%{
    clip-path: polygon(55% 0%, 54% 1%, 52% 2%, 51% 3%, 50% 4%, 50% 5%, 51% 6%, 51% 7%, 52% 9%, 52% 11%, 50% 12%, 48% 13%, 46% 14%, 44% 16%, 44% 16%, 44% 17%, 44% 20%, 45% 20%, 47% 24%, 48% 25%, 50% 26%, 52% 27%, 54% 28%, 55% 29%, 56% 30%, 57% 32%, 57% 32%, 58% 34%, 58% 35%, 57% 36%, 56% 38%, 55% 39%, 54% 40%, 53% 41%, 52% 42%, 52% 43%, 52% 44%, 53% 45%, 54% 46%, 54% 47%, 54% 49%, 53% 50%, 52% 51%, 50% 52%, 48% 53%, 48% 54%, 46% 55%, 43% 57%, 41% 58%, 41% 58%, 39% 60%, 39% 61%, 37% 64%, 37% 65%, 37% 67%, 37% 69%, 39% 70%, 40% 72%, 41% 72%, 43% 74%, 44% 76%, 45% 76%, 49% 78%, 50% 79%, 51% 79%, 53% 80%, 55% 81%, 55% 82%, 56% 83%, 56% 83%, 57% 84%, 57% 84%, 57% 84%, 56% 85%, 55% 86%, 54% 88%, 54% 90%, 55% 91%, 56% 93%, 56% 94%, 58% 95%, 57% 96%, 57% 98%, 56% 99%, 57% 100%, 100% 100%, 100% 0);
  }
  50%{
    clip-path: polygon(77% 0%, 76% 0%, 74% 2%, 74% 2%, 74% 4%, 75% 4%, 76% 5%, 76% 6%, 77% 7%, 76% 8%, 75% 9%, 73% 10%, 72% 11%, 70% 11%, 68% 13%, 68% 13%, 68% 15%, 68% 17%, 68% 19%, 69% 20%, 71% 23%, 71% 23%, 72% 24%, 73% 25%, 75% 26%, 75% 27%, 76% 28%, 76% 29%, 76% 30%, 76% 31%, 75% 32%, 73% 34%, 72% 35%, 69% 37%, 67% 38%, 66% 40%, 64% 42%, 63% 44%, 63% 45%, 63% 48%, 63% 50%, 64% 51%, 64% 53%, 64% 54%, 65% 55%, 65% 56%, 66% 57%, 66% 57%, 65% 59%, 64% 62%, 63% 64%, 62% 66%, 60% 69%, 60% 70%, 60% 75%, 60% 75%, 60% 71%, 60% 73%, 60% 74%, 61% 76%, 62% 79%, 65% 81%, 66% 82%, 68% 84%, 69% 86%, 70% 88%, 72% 90%, 72% 92%, 71% 95%, 70% 97%, 70% 99%, 70% 99%, 70% 100%, 70% 100%, 100% 100%, 100% 0);
  } */
  0%, 100% {
    clip-path: polygon(70% 0%, 54% 10%, 48% 17%, 47% 24%, 51% 36%, 61% 47%, 71% 59%, 77% 66%, 73% 73%, 65% 82%, 58% 88%, 56% 95%, 58% 100%, 100% 100%, 100% 0);
  }
  20%{
    clip-path: polygon(90% 0, 84% 7%, 86% 14%, 90% 22%, 85% 29%, 82% 36%, 88% 43%, 83% 54%, 82% 64%, 87% 73%, 79% 82%, 73% 90%, 81% 100%, 100% 100%, 100% 0);
  }
  40%{
    clip-path: polygon(82% 0, 64% 9%, 58% 18%, 66% 29%, 74% 37%, 77% 46%, 71% 55%, 60% 65%, 55% 74%, 52% 82%, 55% 90%, 63% 97%, 76% 100%, 100% 100%, 100% 0);
  }
  60%{
    clip-path: polygon(90% 0, 84% 7%, 86% 14%, 90% 22%, 85% 29%, 82% 36%, 88% 43%, 83% 54%, 82% 64%, 87% 73%, 79% 82%, 73% 90%, 81% 100%, 100% 100%, 100% 0);
  }
  80%{
    clip-path: polygon(64% 0, 37% 13%, 29% 24%, 39% 31%, 33% 42%, 34% 49%, 41% 56%, 56% 64%, 63% 70%, 62% 81%, 49% 90%, 52% 97%, 76% 100%, 100% 100%, 100% 0);
  }
}

#wave div{
  width: 100%;
  position: absolute;
}

</style>
