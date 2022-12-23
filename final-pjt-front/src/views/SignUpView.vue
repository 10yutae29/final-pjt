<template>
  <div id="signup-view">
    <h1 id="signup-title">회원 가입</h1>
    <form id="signup-form" @submit.prevent="signUp" enctype="multipart/form-data">
      <label id="signup-label" for="username">아이디</label> <br>
      <input type="text" name="username" id="signup-input" v-model="username"> <br>
      <label for="userName">닉네임</label>
      <input type="text" name="userName" id="signup-input" v-model="nickname"> <br>
      <label id="signup-label" for="password1">비밀번호</label> <br>
      <input type="password" name="password1" id="signup-input" v-model="password1"> <br>
      <label id="signup-label" for="password2">비밀번호 확인</label> <br>
      <input type="password" name="password2" id="signup-input" v-model="password2"> <br>
      <label id="signup-label" for="email">이메일</label>
      <input type="email" name="email" id="signup-input" v-model="email">
      <label id="profile_image-label" for="profile_image">프로필 사진</label>
      <input type="file" name="profile_image" id="profile_image" @input="uploadImage" ref="profile_image" accept ="image/* ">
      <label id="signup-label" for="self_introduce">자기소개(30자)</label>
      <textarea name="" id="" cols="30" rows="5" v-model="self_introduce"></textarea>

      <input id="signup-submit" type="submit" value="회원가입">
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
      profile_image: null,
      nickname: null,
      self_introduce: null,
      email: null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      const profile_image = this.profile_image
      const nickname = this.nickname
      const self_introduce = this.self_introduce
      const email = this.email


      const payload = {
        username,
        password1,
        password2,
        profile_image,
        nickname,
        self_introduce,
        email,
      }
      
      this.$store.dispatch('signUp', payload)
    },
    uploadImage(e) {
      const imgFile = e.target.files[0]
      this.profile_image = imgFile
      
    },

  }
}
</script>

<style>
#signup-view {
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

#signup-title{
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  text-align: center;
  font-size: 3vw;
  color: white;

}

#signup-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 0;
}

#signup-form label{
  font-size: 2vw;
  color: white;

}
#signup-input{
  background: rgba(255, 255, 255, 0.15);
  width: 20%;
  aspect-ratio: 4/1;
  font-size: 2vw;
  color: white;
  border-radius: 5px;
}

#signup-submit{
  margin-top: 5px;
  background: rgba(255, 255, 255, 0.705);
  width: 15%;
  aspect-ratio: 4/1;
  border-radius: 5px;
  font-size: 2vw;

}

#signup-submit:hover{
  color: white;
  background: rgba(14, 0, 75, 0.24);
}

</style>