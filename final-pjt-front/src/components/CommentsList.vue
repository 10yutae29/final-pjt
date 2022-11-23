<template>
  <div class="commentlist-grid">
    <div class="movie-recommend-tag">
      <hr><br>
      <h1>영화 리뷰</h1><br>
      <hr>
    </div>
    <div class="comments-case">
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
.commentlist-grid{
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 100%;
  padding: 20px 20px 20px 20px;
}

.comments-case{
  width: 100%;
}

.movie-recommend-tag h1{
  padding-left: 20px;
}
</style>