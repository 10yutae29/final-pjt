<template>
  <div>
    <div id="comment">
      <div id="comment-box">
        <p>댓글 내용 : {{ commentItem.content }}</p>
        <p>댓글 작성자 : {{ commentItem.user }}</p>
        <p>작성 시간 : {{ commentItem.updated_at}}</p>
        <button @click="deleteComment" v-if="this.commentItem.user == this.$store.state.logedin_user.pk">댓글삭제</button>
      </div>
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
    },
    logedinUser(){
      return this.$store.state.logedin_user
    }
  },
  methods: {
    deleteComment() {
      this.$store.dispatch('deleteComment', [this.commentItem.id, this.commentItem.movie])
  
    }
  },
  created() {
    console.log(this.commentItem)
    console.log(this.commentItem.user)
  }
}
</script>

<style>
#comment{
  border-bottom: solid 1px;
}

#comment-box{
  padding-top: 10px;
  padding-bottom: 10px;
}
/* #comment:last-child{
  border-bottom: 1px;
} */
</style>