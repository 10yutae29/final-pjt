<template>
  <div>
    <h1>
      PasswordChangeView
    </h1>

    <form @submit.prevent="changePassword">
      <label for="newpassword1">New password1</label>
      <input type="text" name="newpassword1" id="newpassword1" v-model="new_password1">
      <label for="newpassword2">New password2</label>
      <input type="text" name="newpassword2" id="newpassword2" v-model="new_password2">
      <!-- <label for="uid">Uid</label>
      <input type="text" name="uid" id="uid" v-model="uid"> -->
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
      // uid: null,
    }
  },
  methods: {
    changePassword() {
      const new_password1 = this.new_password1
      const new_password2 = this.new_password2
      // const uid = this.uid
      
      const payload = {
        new_password1,
        new_password2,
        // uid
      }

      this.$store.dispatch('changePassword', payload)
    }
  }
}
</script>

<style>

</style>