<template>
  <div>
    <h1>CommentsList</h1>
    <CommentsListItems
    v-for="comment in comments"
    :key="comment.id"
    :comment="comment"
    @delete-comment="deleteComment"
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
  methods: {
    deleteComment(comment_id) {
      this.$emit('delete-comment', comment_id)
    }
  }
}
</script>

<style>

</style>