<template>
  <div id="signup-view">
    <h1 id="signup-title">회원 가입</h1>
    <form id="signup-form" @submit.prevent="signUp">
      <label id="signup-label" for="username">아이디</label> <br>
      <input type="text" name="username" id="signup-input" v-model="username"> <br>
      <!-- <label for="userName">닉네임</label>
      <input type="text" name="userName" id="userName"> <br> -->
      <label id="signup-label" for="password1">비밀번호</label> <br>
      <input type="text" name="password1" id="signup-input" v-model="password1"> <br>
      <label id="signup-label" for="password2">비밀번호 확인</label> <br>
      <input type="text" name="password2" id="signup-input" v-model="password2"> <br>

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
  display: grid;
  grid-template-columns: 40% 20% 40%;
  grid-template-rows: auto auto;
}

#signup-title{
  grid-column: 2;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 20px;
  text-align: center;
}

#signup-form{
  grid-column: 2;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 10px;
}

#signup-input{
  background: rgba(255, 255, 255, 0.15);
}

#signup-submit{
  margin-top: 5px;
  background: rgba(218, 165, 32, 0.421);
}

#signup-label{
  margin-bottom: 3px;
}

</style>