<template>
  <div class="userchange-view">
    <h1 class="userchange-title">회원 정보 변경</h1>
    <form class="userchange-form" id="signup-form" @submit.prevent="changeUser" enctype="multipart/form-data">
      <label for="nickname">닉네임</label>
      <input type="text" name="nickname" id="signup-input" v-model="nickname"> <br>
      <label id="signup-label" for="email">이메일</label>
      <input type="email" name="email" id="signup-input" v-model="email">
      <label id="signup-label" for="self_introduce">자기소개(30자)</label>
      <textarea name="" id="" cols="30" rows="5" v-model="self_introduce"></textarea>
      <label id="profile_image-label" for="profile_image">프로필 사진</label>
      <input class="userchange-image" type="file" name="profile_image" id="profile_image" @input="uploadImage" ref="profile_image" accept ="image/* ">
      <input class="userchange-submit" id="userchange-signup-submit" type="submit" value="회원 정보 변경">
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserChangeView',
  data () {
    return {
      nickname: this.$store.state.user_detail.nickname,
      email: this.$store.state.user_detail.email,
      self_introduce: this.$store.state.user_detail.self_introduce,
      profile_image: null,
    }
  },
  methods : {
    changeUser() {
      const nickname = this.nickname
      const email = this.email
      const self_introduce = this.self_introduce
      const profile_image = this.profile_image
      const payload = {
        nickname,
        email,
        self_introduce,
        profile_image,
      }

      this.$store.dispatch('changeUser', payload)
    },
    uploadImage(e) {
      const imgFile = e.target.files[0]
      this.profile_image = imgFile
      
    },
  }
}
</script>

<style>
.userchange-view {
  margin: 10vh 10vh 10vh 10vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template: 20% auto;
  padding: 5vw;
  background: rgba(14, 0, 75, 0.24);
  border: solid rgb(255, 255, 255) 0.5px;
  border-radius: 5px;
}

.userchange-title{
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  text-align: center;
  font-size: 3vw;
  color: white;
}

.userchange-form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 0;
}

.userchange-form input{
  margin-bottom: 5px;
}

.userchange-image{
  border-radius: 5px;
  margin-bottom: 5px;
}

.userchange-submit{
  margin-top: 5px;
  background: rgba(255, 255, 255, 0.705);
  width: 15%;
  aspect-ratio: 4/1;
  border-radius: 5px;
  font-size: 1.5vw;

}

.userchange-submit:hover{
  color: white;
  background: rgba(14, 0, 75, 0.24);
}
</style>