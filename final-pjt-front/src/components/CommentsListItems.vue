<template>
  <div class="comment-grid">
    <div class="comment-username">
      <p>{{ commentItem.user.username }}</p>
    </div>
    <div class="comment-box">
        <p>{{ commentItem.content }}</p>
        <div>
          <span>{{ commentItem.updated_at}}</span>
          <span @click="deleteComment" v-if="this.commentItem.user.id == this.$store.state.logedin_user.pk">댓글삭제</span>
          <hr>
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
.comment-grid{
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
}


.comment-username p{
  font-size: 2vw;
  padding-left: 20px;
  margin-bottom: 0;

}

.comment-box{
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 100%;
  gap: 1vw;
  padding-left: 20px;
  padding-top: 20px;

}

.comment-box p{
  width: 100%;
  font-weight: bold;
  padding: 5px 5px 5px 15px;
  background: rgba(9, 0, 88, 0.192);
  border-radius: 5px;
  height: auto;
  word-break: break-all;
  word-wrap: break-word;
  font-size: 2vw;
  margin-bottom: 0;
  font-weight: lighter;
}

.comment-box div span{
  padding-right: 20px;
  padding-left: 5px;
  color: rgb(190, 190, 190);
  /* font:bold; */
}

.comment-display{
  width: 100%;
}

.comment-box div span:nth-child(2){
  cursor: pointer;
}
/* #comment:last-child{
  border-bottom: 1px;
} */
</style>