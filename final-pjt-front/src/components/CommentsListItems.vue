<template>
  <div>
    <div style="border:solid;">
      <p>댓글 내용 : {{ comment.content }}</p>
      <p>댓글 작성자 : {{ comment.user }}</p>
      <p>작성 시간 : {{ comment.updated_at}}</p>
      <button @click="deleteComment">댓글삭제</button>
    </div>
  </div>
</template>

<script>
// const API_URL = 'http://127.0.0.1:8000'


export default {
  name: 'CommentsListItem',
  props: {
    comment: Object
  },
  methods: {
    deleteComment() {
      
      this.$emit('delete-comment', this.comment.id)
    }
  }
}
</script>

<style>

</style>