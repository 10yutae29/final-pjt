<template>
  <div>
    <h1>유저 정보</h1>
    <p>{{ user?.username }}</p>
    <p @click="goChangePassword">비밀번호 변경</p>
  </div>
</template>

<script>

export default {
  name: 'UserView',
  data() {
    return {
    }
  },
  computed: {
    user() {
      return this.$store.state.logedin_user
    }
  },
  methods: {  
    goChangePassword() {
      this.$router.push('/passwordchangeview/')
    }
  },
  created() {
  }
}
</script>

<style>

</style>