<template>
  <div>
    <div id="user" >
       <div class="row">
      <div id="user-block" class="col-6">
        <h1>안녕하세요 {{ user_detail?.username }} 님!</h1>
        <button @click="goChangePassword">비밀번호 변경</button>
      </div>

        <div class="col-6 my-auto">
          <UserCommentList
          :comments="user_detail.comment_set"
          />
        </div>

        <div class="col-12 my-auto">
          <LikeMovieList
          :liked_movies="user_detail.liked_movies"
          />
        </div>

    </div>
    </div>
  </div>
</template>

<script>
import UserCommentList from '@/components/UserCommentList'
import LikeMovieList from '@/components/LikeMovieList'

export default {
  components:{
    UserCommentList,
    LikeMovieList
  },
  name: 'UserView',
  data() {
    return {
    }
  },
  computed: {
    user() {
      return this.$store.state.user_info
    },
    user_detail() {
      return this.$store.state.user_detail
    }
  },
  methods: {  
    goChangePassword() {
      this.$router.push('/passwordchangeview/')
    },
    getUserInfo() {
      this.$store.dispatch('getUserInfo', this.user.pk)
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style>
#user{
  justify-content: center;
  padding: 20px 20px 20px 20px;
  display: flex;
}
#user-block{
  background: rgba(238, 221, 60, 0.762);
  border-radius: 5px;
  border: solid rgb(6, 8, 66);
  position: relative;
  width: 50%;
  text-align: center;
}

</style>