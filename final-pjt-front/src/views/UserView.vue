<template>
  <div>
    <h1>
      UserView
    </h1>
    <p>{{ user?.username }}</p>
    <p @click="goChangePassword">비밀번호 변경</p>
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'UserView',
  data() {
    return {
      user: null
    }
  },
  methods: {
    getUser() {
      const user_id = this.$route.params.id
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/${user_id}/`,
      })
      .then(response => {
        this.user = response.data
      })
    },
    goChangePassword() {
      this.$router.push('/passwordchangeview/')
    }
  },
  created() {
    this.getUser()
  }
}
</script>

<style>

</style>