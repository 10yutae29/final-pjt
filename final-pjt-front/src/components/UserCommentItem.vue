<template>
  <div>
    <div @click="goDetail">
      <h5 id="comment-content">{{ comment.content }}</h5>
      <span id="comment-update">{{ comment.updated_at }}</span>
    </div>
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
#comment-content{
  text-align: left;
  margin-bottom: 0px;
}

#comment-update{
  text-align: left;
  font-size: 15px;
  margin-bottom: 10px;
}
</style>