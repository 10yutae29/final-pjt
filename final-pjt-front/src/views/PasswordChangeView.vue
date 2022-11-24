<template>
  <div class="passwordchange-view">
    <h1 class="passwordchange-title">비밀번호 변경</h1>
    <form class="passwordchange-form" @submit.prevent="changePassword">
      <label for="newpassword1">New password1</label><br>
      <input class="passwordchange-input" type="text" name="newpassword1" id="newpassword1" v-model="new_password1"><br>
      <label for="newpassword2">New password2</label><br>
      <input class="passwordchange-input" type="text" name="newpassword2" id="newpassword2" v-model="new_password2"><br>
      <input class="passwordchange-submit" type="submit" value="비밀번호 변경">
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
.passwordchange-view{
  margin: 10vh 10vh 10vh 10vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template: 20% auto;
  padding: 5vw;
  /* background: radial-gradient(white , rgb(13, 97, 207)); */
  background: rgba(14, 0, 75, 0.24);
  border: solid rgb(255, 255, 255) 0.5px;
  border-radius: 5px;
}

.passwordchange-title{
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  text-align: center;
  font-size: 3vw;
  color: white;
}

.passwordchange-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 0;
}

.passwordchange-form label{
  font-size: 2vw;
  color: white;
}

.passwordchange-input{
  background: rgba(255, 255, 255, 0.15);
  width: 20%;
  aspect-ratio: 4/1;
  font-size: 2vw;
  color: white;
  border-radius: 5px;
}

.passwordchange-submit{
  margin-top: 5px;
  background: rgba(255, 255, 255, 0.705);
  width: 15%;
  aspect-ratio: 4/1;
  border-radius: 5px;
  font-size: 1.5vw;

}

.passwordchange-submit:hover{
  color: white;
  background: rgba(14, 0, 75, 0.24);
}
</style>