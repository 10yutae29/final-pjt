<template>
  <div class="user-comment-list">
    <div class="comment-list-tag"><p>작성한 댓글 목록</p></div>
    <div class="user-comment-box">
      <UserCommentItem
      v-for="comment_info in comments_info"
      :key="comment_info.id"
      :comment_info="comment_info"
      />
    </div>
  </div>
</template>

<script>
import UserCommentItem from '@/components/UserCommentItem'
export default {
  name: 'UserCommentList',
  components: {
    UserCommentItem
  },
  props:{
    comments:Array
  },
  computed: {
    comments_info() {
      return this.comments
    }
  }
}
</script>

<style>
.user-comment-list{
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 20% 80%;
}

.comment-list-tag{
  display: flex;
  align-items: center;
  
}
.comment-list-tag p{
  font-size: 2vw;
  margin: 0;
}
.user-comment-box{
  overflow: auto;
}
</style>