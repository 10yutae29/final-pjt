<template>
  <div id="login-view">
    <div>
      <h1 id="login-title">로그인</h1>
    </div>

    <div>
      <form id="login-form" @submit.prevent="logIn">
        <label for="username" id="login-label">아이디</label> <br>
        <input type="text" v-model="username" id="login-input"> <br>
  
        <label for="password" id="login-label">비밀번호</label> <br>
        <input type="password" v-model="password" id="login-input"> <br>
  
        <input id="login-submit" type="submit" value="로그인">
  
      </form>
    </div>
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

#login-title{
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  text-align: center;
  font-size: 3vw;
}

#login-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 0;
}

#login-form label{
  font-size: 2vw;
}

#login-input{
  background: rgba(255, 255, 255, 0.15);
  width: 20%;
  aspect-ratio: 4/1;
  font-size: 2vw;
  border-radius: 5px;
}

#login-submit{
  margin-top: 5px;
  background: rgba(58, 110, 255, 0.486);
  width: 15%;
  aspect-ratio: 4/1;
  border-radius: 5px;
  font-size: 2vw;
}



/* #login-label{
  margin-bottom: 3px;
} */

</style>