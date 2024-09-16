<template>
  <div>
    <img
      v-if="userImage"
      :src="userImage"
    >
    <div
      v-else
      class="avatar-circle"
    >
      <img src="/assets/icons/empty-avatar.svg">
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'UserAvatar',
  props:{
    userImage:{
      type:String,
      default:'',
    },
  },
  setup() {
  },
})
</script>
<style scoped>
.avatar-circle{
    align-items: center;
    background: #0A7FAE;
    border-radius: 30px;
    display: flex;
    height: 30px;
    justify-content: center;
    width: 30px;
}
</style>