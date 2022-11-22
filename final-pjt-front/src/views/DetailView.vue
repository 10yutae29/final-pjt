<template>
  <div>
    <div class="container" id="movie-container">
      <div id="movie-info2">
        <img :src="`https://image.tmdb.org/t/p/original${movie_info?.poster_path}`" alt=""  id="poster-detail">
      </div>
      <div id="movie-info2">
        <h1 id="title-detail">{{ movie_info?.title }}</h1>
        <p>평점 : {{ movie_info?.vote_average }}</p>
        <p>개봉일자 : {{ movie_info?.release_date }}</p>    
        <p>장르 : {{ movie_info?.genres }}</p>
        <h5>영화 줄거리</h5>
        <p>{{ movie_info?.overview }}</p>
      </div>

      <div id="like-button">
        <div v-if="logedin">
          <ion-icon size="large" v-if="is_liked_conition" @click="toggleLike" name="heart" id="heart"></ion-icon>
          <ion-icon size="large" v-if="!is_liked_conition" @click="toggleLike" name="heart" id="noheart"></ion-icon>
        </div>
      </div>

      <form id="form" @submit.prevent="createComment">
        <input id="" type="textarea" v-model="comment_create">
        <input type="submit" value="작성">
      </form>
      <div id="comment-list">
        <CommentsList
        :comments="comments"
        />
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
      comment_create: null
    }
  },
  computed: {
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
#heart {
  color: red;
}

#heart, #noheart{
  cursor: pointer;
}

#poster-detail {
  width: 70%;
}

#title-detail{
  flex-basis: 100%;
}

#movie-info2{
  position: relative;
  flex-basis: 50%;
}

#movie-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

#like-button{
  flex-basis: 100%;
}

#form{
  flex-basis: 100%;
}

#comment-list{
  flex-basis: 100%;
}
</style>