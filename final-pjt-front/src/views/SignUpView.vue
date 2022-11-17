<template>
  <div>
    <h1>
      SignUp    
    </h1>
    <form @submit.prevent="signUp">
      <label for="username">아이디</label> <br>
      <input type="text" name="username" id="username" v-model="username"> <br>
      <!-- <label for="userName">닉네임</label>
      <input type="text" name="userName" id="userName"> <br> -->
      <label for="password1">비밀번호</label> <br>
      <input type="text" name="password1" id="password1" v-model="password1"> <br>
      <label for="password2">비밀번호 확인</label> <br>
      <input type="text" name="password2" id="password2" v-model="password2"> <br>

      <input type="submit" value="회원가입">
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

</style>