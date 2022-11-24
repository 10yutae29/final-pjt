<template>
  <div class="comment-item">
    <hr>
    <p class="comment-content" @click="goDetail">{{ comment.content }}</p>
    <span class="comment-update">{{ updated_time }}</span>
  </div>
</template>

<script>
export default {
  name: 'UserCommentItem',
  props:{
    comment_info:Object
  },
  computed: {
    comment() {
      return this.comment_info
    },
    updated_time(){
      const comment_time = this.comment_info.updated_at
      const day = comment_time.substring(0,10)
      const time = comment_time.substring(11,19)
      return day+ ' ' + time
    }
  },
  methods: {
    goDetail(){
      this.$router.push(`/moviesview/${this.comment.movie}/`)
    }
  }
}
</script>

<style>
.comment-item{
  width: 100%;
}

.comment-content{
  text-align: left;
  margin-bottom: 0px;
  font-size: 1vw;
  width: 100%;
  word-break: break-all;
  word-wrap: break-word;
  cursor: pointer;
}

.comment-content:hover{
  color: black;
}

.comment-update{
  font-size: 0.7vw;
  text-align: left;
  margin-bottom: 10px;
  color: rgb(190, 190, 190);

}
</style>