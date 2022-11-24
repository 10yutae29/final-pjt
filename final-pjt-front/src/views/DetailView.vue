<template>
  <div class="detailview-grid">
    
    <div class="detailview-movie-box">
      <div class="detailview-poster-box">
        <img class="detailview-poster" :src="`https://image.tmdb.org/t/p/original${movie_info?.poster_path}`" alt="">
      </div>
      <div class="detailview-movie-info">
        <h1>{{ movie_info?.title }}</h1> <hr> 
        <p>평점 : {{ movie_info?.vote_average }}점</p>
        <p>개봉일자 : {{ movie_info?.release_date }}</p>  
        <p>장르 : {{ movie_genres }}</p>
        <div class="heart-box">
          <ion-icon  v-if="is_liked_conition" @click="toggleLike" name="heart" id="heart"></ion-icon>
          <ion-icon  v-if="!is_liked_conition" @click="toggleLike" name="heart" id="noheart"></ion-icon>
        </div>
        <p class="user-num">{{ movie_info?.like_users.length }}명이 이 영화를 좋아합니다.</p>
        <h5>영화 줄거리</h5>
        <div class="overview-box">
          <hr>
          <p>{{ movie_info?.overview }}</p>
        </div>
      </div>
      
      <div class="overview-total-box">
      </div>
    </div>
    
    <div class="detailview-comment">
      <div>
        <CommentsList
        :comments="comments"
        />
      </div>
      <div class="detailview-createcomment">
        <div class="comment-create-tag">
          <p>리뷰 작성</p>
        </div>
        <div>
          <textarea name="comment" class="comment-textarea comment-input-tag" v-model="comment_create"></textarea>
        </div>
        <!-- <input type="textarea" v-model="comment_create"> -->
        <div class="createcomment-btn">
          <input @click="createComment" type="submit" value="작성">
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios  from 'axios'
import CommentsList from '@/components/CommentsList'

const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'DetailView',
  components: {
    CommentsList
  },
  data() {
    return{
      movie: null,
      comment_create: null,
      movie_genres: null
    }
  },
  computed: {
    movie_genres_info(){
      return this.movie_genres
    },
    movie_info() {
      return this.movie
    },
    comments() {
      return this.$store.state.movie_comments
    },
    is_liked_conition() {
      if (this.$store.state.logedin_user) {
        if (this.movie_info) {
          return this.movie_info.like_users.includes(this.$store.state.logedin_user.pk)
        }
      }
      return false 
    },
    logedin() {
      return this.$store.state.logedin_user
    }
  },
  methods: {
    getMovieDetail() {
      axios({
        method: 'get',
        url: `${API_URL}/movies/${this.$route.params.id}`
      })
      .then((response) => {
        this.movie = response.data
        const genres_list = []
        for (let movie_genre in this.movie.genres) {
          genres_list.push(this.$store.state.genres[movie_genre].name)
        }
        const genres_string = genres_list.join(', ')
        this.movie_genres = genres_string
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getMovieComments() {
      const movie_id = this.$route.params.id
      this.$store.dispatch('getMovieComments', movie_id)
    },
    createComment() {
      const content = this.comment_create
      const user = this.$store.state.logedin_user.pk
      const movie = this.$route.params.id

      const payload = {
        content,
        user,
        movie
      }
      this.$store.dispatch('createComment', payload)
      this.comment_create = null

    },
    toggleLike() {
      const movie_id = this.movie.id
      axios({
        method: 'post',
        url: `${API_URL}/movies/${movie_id}/likes/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
      .then(() => {
        this.getMovieDetail()
        this.$store.dispatch('getMovies')
      })
      .catch((error) => {
        console.log(error)
      })
    },
  },
  created() {
    if (!this.logedin) {
      window.alert('로그인이 필요한 서비스입니다.')
      this.$router.push('/LoginView')
    } else {
      this.getMovieDetail()
      this.getMovieComments()
    }
  }
}
</script>

<style>
.detailview-grid{
  margin: 10vh 10vh 10vh 10vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  color: white;
}

.detailview-movie-box{
  border-radius: 5px;
  /* background: radial-gradient(white , rgb(223, 255, 232)); */
  background: rgba(14, 0, 75, 0.24);
  border: solid rgb(255, 255, 255) 0.5px;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: auto ;
  padding: 5vh 5vh 5vh 5vh;
}

.detailview-poster-box{
  width:100%;
  aspect-ratio: 5 / 8 auto ;

  /* height: 100%; */
  border-radius: 5px;
  border: solid 0.2px;
  display:flex;
  justify-content: center;
}

.detailview-poster{
  /* object-fit: cover; */
  border-radius: 5px;
  height: 100%;
  width: 100%;
  
}

.detailview-movie-info{
  /* grid-row: 1/2; */
  width: 100%;
  border-radius: 5px;
  padding: 20px 20px 20px 20px;
}
.detailview-movie-info h1{
  font-size: 3vw;
  color: white;
}
.detailview-movie-info p{
  margin-left: 10px;
  color: white;
  font-size: 1.5vw;
  margin-bottom: 10px;
}

.heart-box{
  height: 3vw;
  width: 3vw;
}

.overview-total-box{
  padding-left: 1.5vw;
  padding-right: 1.5vw;
}

.overview-box{
  /* border-radius: 5px;
  border: solid 0.1px; */
  /* padding: 1vw; */
  font-size: 1vw;
}

.movie-content-tag{
  display: flex;
  justify-content: center;
  padding-top: 3vw;
}



.comment-create-tag{
  font-size: 2vw;
}

.detailview-movie-info h5{
  font-size: 1.5vw;
  margin-top: 50px;
  margin-left: 10px;
}

.detailview-comment{
  margin-top: 20px;
  background: rgba(14, 0, 75, 0.24);
  border: solid rgb(255, 255, 255) 0.5px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.user-num{
  font-size: 1.5vw;
}

.detailview-createcomment{
  padding: 20px 20px 20px 20px;
  display: grid;
  grid-template-rows: auto auto auto;
}

.comment-input-tag{
  font-size: 2vw;
}

.createcomment-btn{
  display: flex;
  justify-content: right;
}

.createcomment-btn input{
  font-size: 2vw;
}

.comment-textarea{
  width: 100%;
  border-radius: 5px;
}

#heart {
  color: red;
}

#heart, #noheart{
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>