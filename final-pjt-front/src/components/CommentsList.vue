<template>
  <div>
    <div id="comments-case">
      <CommentsListItems
      v-for="comment in commentsList"
      :key="comment.id"
      :comment="comment"
      />
    </div>
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
#comments-case{
  border: solid;
  border-radius: 5px;
  margin: 5px;
}
</style>