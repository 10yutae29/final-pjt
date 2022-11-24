<template>
  <div id="signup-view">
    <h1 id="signup-title">회원 가입</h1>
    <form id="signup-form" @submit.prevent="signUp">
      <label id="signup-label" for="username">아이디</label> <br>
      <input type="text" name="username" id="signup-input" v-model="username"> <br>
      <!-- <label for="userName">닉네임</label>
      <input type="text" name="userName" id="userName"> <br> -->
      <label id="signup-label" for="password1">비밀번호</label> <br>
      <input type="password" name="password1" id="signup-input" v-model="password1"> <br>
      <label id="signup-label" for="password2">비밀번호 확인</label> <br>
      <input type="password" name="password2" id="signup-input" v-model="password2"> <br>

      <input id="signup-submit" type="submit" value="회원가입">
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        username,
        password1,
        password2
      }
      
      this.$store.dispatch('signUp', payload)
    }
  }
}
</script>

<style>
#signup-view {
  margin: 10vh 10vh 10vh 10vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template: 20% auto;
  padding: 5vw;
  /* background: radial-gradient(white , rgb(13, 97, 207)); */
  background: white;
  border-radius: 5px;
  color: rgb(10, 0, 56);
}

#signup-title{
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  text-align: center;
  font-size: 3vw;
}

#signup-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 0;
}

#signup-form label{
  font-size: 2vw;
}
#signup-input{
  background: rgba(255, 255, 255, 0.15);
  width: 25%;
  aspect-ratio: 4/1;
  font-size: 2vw;
  border-radius: 5px;
}

#signup-submit{
  margin-top: 5px;
  background: rgba(58, 110, 255, 0.486);
  width: 15%;
  aspect-ratio: 4/1;
  border-radius: 5px;
  font-size: 2vw;

}



</style>