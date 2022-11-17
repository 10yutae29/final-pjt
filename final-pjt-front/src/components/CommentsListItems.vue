<template>
  <div>
    <h1>CommentsListItem</h1>
    <p>댓글 하나하나</p>
    <p>댓글 내용 : {{ comment.content }}</p>
    <p>댓글 작성자 : {{ comment.user_id }}</p>
    <p>작성 시간 : {{ comment.updated_at}}</p>
    <button @click="deleteComment">댓글삭제</button>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000'


export default {
  name: 'CommentsListItem',
  props: {
    comment: Object
  },
  methods: {
    deleteComment() {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/logout/`,
      })
    }
  }
}
</script>

<style>

</style>