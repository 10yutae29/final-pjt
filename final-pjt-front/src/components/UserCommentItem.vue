<template>
  <div>
    <div>
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
  }
}
</script>

<style>

</style>