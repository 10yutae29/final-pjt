<template>
  <div id="login-view">
    <h1 id="login-title">로그인</h1>

    <form id="login-form" @submit.prevent="logIn">
      <label for="username" id="login-label">아이디</label> <br>
      <input type="text" v-model="username" id="login-input"> <br>

      <label for="password" id="login-label">비밀번호</label> <br>
      <input type="text" v-model="password" id="login-input"> <br>

      <input id="login-submit" type="submit" value="로그인">

    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    logIn() {
      const username = this.username
      const password = this.password

      const payload = {
        username,
        password,
      }
      
      this.$store.dispatch('logIn', payload)
    }
  }
}
</script>

<style>
#login-view {
  display: grid;
  grid-template-columns: 40% 20% 40%;
  grid-template-rows: auto auto;
}

#login-title{
  grid-column: 2;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 20px;
  text-align: center;
}

#login-form{
  grid-column: 2;
  justify-content: center;
  align-items: center;
  color: white;
  margin-top: 10px;
}

#login-input{
  background: rgba(255, 255, 255, 0.15);
}

#login-submit{
  margin-top: 5px;
  background: rgba(218, 165, 32, 0.421);
}

#login-label{
  margin-bottom: 3px;
}

</style>