<template>
  <div>
    <h1>회원 정보 변경</h1>

    <form id="signup-form" @submit.prevent="changeUser" enctype="multipart/form-data">
        <label for="nickname">닉네임</label>
        <input type="text" name="nickname" id="signup-input" v-model="nickname"> <br>
        <label id="signup-label" for="email">이메일</label>
        <input type="email" name="email" id="signup-input" v-model="email">
        <label id="signup-label" for="self_introduce">자기소개(30자)</label>
        <textarea name="" id="" cols="30" rows="5" v-model="self_introduce"></textarea>
        <label id="profile_image-label" for="profile_image">프로필 사진</label>
        <input type="file" name="profile_image" id="profile_image" @input="uploadImage" ref="profile_image" accept ="image/* ">
        <input id="signup-submit" type="submit" value="회원 정보 변경">
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

</style>