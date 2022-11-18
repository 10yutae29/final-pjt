<template>
  <div>
    <div style="border:solid;">
      <p>댓글 내용 : {{ commentItem.content }}</p>
      <p>댓글 작성자 : {{ commentItem.user }}</p>
      <p>작성 시간 : {{ commentItem.updated_at}}</p>
      <button @click="deleteComment">댓글삭제</button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// const API_URL = 'http://127.0.0.1:8000'


export default {
  name: 'CommentsListItem',
  props: {
    comment: Object
  },
  computed: {
    commentItem(){
      return this.comment
    }
  },
  methods: {
    deleteComment() {
      this.$store.dispatch('deleteComment', [this.commentItem.id, this.commentItem.movie])
      console.log(this.commentItem)
    }
  }
}
</script>

<style>

</style>