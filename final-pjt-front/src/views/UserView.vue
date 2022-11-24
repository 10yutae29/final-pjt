<template>
  <div class="user-total">
    <div id="userview-grid">
      <div id="user-block">
        <h1>안녕하세요 {{ user_detail?.username }} 님!</h1>
        <button @click="goChangePassword">비밀번호 변경</button>
      </div>

        <div id="comments">
          <UserCommentList
          :comments="user_detail.comment_set"
          />
        </div>

        <div id="like-movie-list">
          <h3 id="like-movie-list-title">좋아하는 영화 목록</h3>
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
    }
  },
  created() {
    this.getUserInfo()
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
  background: white;
  border-radius: 5px;
  padding: 2vw 2vw 2vw 2vw; 

}

#user-block{
  padding: 10px 0 0 10px;
  grid-column: 1 / span 2;
  color: rgb(8, 0, 53);


  /* background: rgba(238, 221, 60, 0.762);
  border-radius: 5px;
  border: solid rgb(6, 8, 66);
  position: relative;
  width: 50%;
  text-align: center; */
}

#comments{
  grid-column: 3 / span 2;
  color: rgb(8, 0, 53);


  /* background: rgba(238, 221, 60, 0.762);
  border-radius: 5px;
  border: solid rgb(6, 8, 66);
  position: relative;
  width: 50%;
  text-align: center; */
}

#like-movie-list-title{
  grid-column: 1 / span 5; 
  text-decoration-line: underline;
  margin-top: 5px;
  color: rgb(8, 0, 53);

}

#like-movie-list{
  grid-column: 1 / span 4; 
  display: grid;
  grid-template-columns: 18% 18% 18% 18% 18%;
  padding: 20px;
  column-gap: 2.5%;
  row-gap: 20px;
}
</style>