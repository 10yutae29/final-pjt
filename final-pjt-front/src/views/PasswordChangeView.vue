<template>
  <div>
    <h1>비밀번호 변경</h1>
    <form @submit.prevent="changePassword">
      <label for="newpassword1">New password1</label>
      <input type="text" name="newpassword1" id="newpassword1" v-model="new_password1">
      <label for="newpassword2">New password2</label>
      <input type="text" name="newpassword2" id="newpassword2" v-model="new_password2">
      <input type="submit" value="비밀번호 변경">
    </form>
  </div>
</template>

<script>
export default {
  name: 'PasswordChangeView',
  data() {
    return {
      new_password1: null,
      new_password2: null,
    }
  },
  methods: {
    changePassword() {
      const new_password1 = this.new_password1
      const new_password2 = this.new_password2
      
      const payload = {
        new_password1,
        new_password2,
      }

      this.$store.dispatch('changePassword', payload)
    }
  }
}
</script>

<style>

</style>