<template>
  <div>
    <div @click="goDetail">
      <h1>{{ comment.content }}</h1>
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

</style>