<template>
  <div class="detailview-grid">
    <div class="detailview-poster-box">
      <img class="detailview-poster" :src="`https://image.tmdb.org/t/p/original${movie_info?.poster_path}`" alt="">
    </div>
    <div class="detailview-movie-info">
      <h1>{{ movie_info?.title }}</h1>
      <div v-if="logedin">
        <ion-icon size="large" v-if="is_liked_conition" @click="toggleLike" name="heart" id="heart"></ion-icon>
        <ion-icon size="large" v-if="!is_liked_conition" @click="toggleLike" name="heart" id="noheart"></ion-icon>
      </div>
      <p>평점 : {{ movie_info?.vote_average }}</p>
      <p>개봉일자 : {{ movie_info?.release_date }}</p>    
      <p>장르 : {{ movie_genres }}</p>
      <h5>영화 줄거리</h5>
      <p>{{ movie_info?.overview }}</p>
    </div>
    <div class="detailview-comment">
      <div>
        <CommentsList
        :comments="comments"
        />
      </div>
      <form @submit.prevent="createComment">
        <input type="textarea" v-model="comment_create">
        <input type="submit" value="작성">
      </form>
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
  margin: 50px 50px 50px 50px;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: auto auto;
}

.detailview-poster-box{
  width:100%;
  border-radius: white 5px;
  aspect-ratio: 5 / 7 auto ;
}

.detailview-poster{
  object-fit: cover;
  border-radius: 5px;
  height: 100%;
  
}

.detailview-movie-info{
  width: 100%;
  background: white;
  border-radius: 5px;
  padding: 20px 20px 20px 20px;
}
.detailview-movie-info h1{
  font-size: 7vw;
  text-align: center;
}
.detailview-comment{
  margin-top:20px;
  grid-column: 1/3;
}

#heart {
  color: red;
}

#heart, #noheart{
  cursor: pointer;
}
</style>