<template>
  <div class="user-total">
    <div id="userview-grid">
      <div id="user-block">
        <div>
          <h1>안녕하세요 <span class="nickname">{{ user_detail?.nickname }}</span>님!</h1>
          <p>{{ user_detail?.username }}</p>
          <div>
            <h3>자기소개</h3>
            <h5>{{ user_detail?.self_introduce }}</h5>
            <h3>이메일</h3>
            <h4>{{ user_detail?.email }} </h4>
            <img class="profile_image" :src="`http://127.0.0.1:8000${user_detail?.profile_image}`" alt="">
          </div>
        </div>
        <div class="user-block-btn">
          <button @click="goChangeUser">회원 정보 변경</button>
          <button @click="goChangePassword">비밀번호 변경</button>
        </div>
      </div>

        <div id="comments">
          <UserCommentList
          :comments="user_detail.comment_set"
          />
        </div>

        <div id="like-movie-list">
          <div class="like-movie-list-title">
            <p >좋아하는 영화 목록</p><hr>
          </div>
          <MoviesListItem
          v-for="movie in like_movies"
          :key="movie.id"
          :movie="movie"
          />
        </div>
    </div>
  </div>
</template>

<script>
import UserCommentList from '@/components/UserCommentList'
import MoviesListItem from '@/components/MoviesListItem'

export default {
  name: 'UserView',
  components:{
    UserCommentList,
    MoviesListItem,
  },
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
    },
    like_movies() {
      return this.$store.state.movies.filter(movie => this.user_detail.liked_movies.includes(movie.id))
      }
  },
  methods: {  
    goChangePassword() {
      this.$router.push('/passwordchangeview/')
    },
    getUserInfo() {
      console.log(this.user)
      this.$store.dispatch('getUserInfo', this.user.pk)
    },
    goChangeUser() {
      this.$router.push('/userchangeview/')
    }
  },
  created() {
    this.getUserInfo()
    console.log(this.user_detail)
  }
}
</script>

<style>
.user-total{
  margin: 10vh 10vh 10vh 10vh;
}
#userview-grid{
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 70vh auto;
  background: rgba(14, 0, 75, 0.24);
  border: solid rgb(255, 255, 255) 0.5px;
  border-radius: 5px;
  padding: 2vw 2vw 2vw 2vw; 

}

#user-block{
  padding: 10px 0 0 10px;
  grid-column: 1 / span 2;
  color: white;
  display: grid;
  grid-template-rows: auto auto;
}

#comments{
  grid-column: 3 / span 2;
  color: white
}

.nickname{
  color: rgb(0, 255, 174);
}

.like-movie-list-title{
  grid-column: 1 / span 5; 
  margin-top: 5px;
  color: white;
  font-size: 2vw;
}

.like-movie-list-title p{
  font-size: 2vw;
}

#user-block div h1{
  font-size: 2.7vw;
}

#like-movie-list{
  grid-column: 1 / span 4; 
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  grid-template-rows: auto auto;
  padding: 20px;
  column-gap: 2.5%;
  row-gap: 20px;
}

.user-block-btn button{
  width: 60%;
  aspect-ratio: 6/1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.705);
  color: rgb(10, 0, 56);
  font-size: 1.5vw;
}

.user-block-btn button:hover{
  color: white;
  background: rgba(14, 0, 75, 0.24);
}

.profile_image{
  width: 150px;
  height: 150px;
  border-radius: 5px;
}
</style>