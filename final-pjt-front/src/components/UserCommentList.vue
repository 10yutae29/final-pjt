<template>
  <div>
    UserCommentList
    <UserCommentItem
    v-for="comment_info in comments_info"
    :key="comment_info.id"
    :comment_info="comment_info"
    />
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

</style>