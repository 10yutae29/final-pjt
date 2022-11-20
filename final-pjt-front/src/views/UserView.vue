<template>
  <div>
    <div id="user">
      <div id="user-block">
        <h1>유저 정보</h1>
        <p>{{ user?.username }}</p>
        <button @click="goChangePassword">비밀번호 변경</button>
      </div>
    </div>
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
      return this.$store.state.user_info
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
#user{
  justify-content: center;
  padding: 20px 20px 20px 20px;
}
#user-block{
  background: rgb(150, 243, 255);
  border-radius: 5px;
  border: solid rgb(6, 8, 66);
  position: relative;
  /* display: inline; */
  width: 100%;
}
</style>