<template>
  <div>
    <h1>LoginView</h1>

    <form @submit.prevent="logIn">
      <label for="username">아이디</label> <br>
      <input type="text" v-model="username" id="username"> <br>

      <label for="password">비밀번호</label> <br>
      <input type="text" v-model="password" id="password"> <br>

      <input type="submit" value="로그인">

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
      
      console.log(payload)
      this.$store.dispatch('logIn', payload)
    }
  }
}
</script>

<style>

</style>