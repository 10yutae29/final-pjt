<template>
  <div>
    <h1>CommentsList</h1>
    <CommentsListItems
    v-for="comment in commentsList"
    :key="comment.id"
    :comment="comment"
    />
  </div>
</template>

<script>
import CommentsListItems from '@/components/CommentsListItems'

export default {
  name: 'CommentsList',
  components:{
    CommentsListItems
  },
  props: {
    comments: Array
  },
  computed: {
    commentsList() {
      return this.comments
    }
  }
}
</script>

<style>

</style>