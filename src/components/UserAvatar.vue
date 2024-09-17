<template>
  <div>
    <img
      v-if="userImage && !hasError"
      :src="userImage"
      @error="handleImageError"
      class="avatar-img"
      alt="User Avatar"
    >
    <div
      v-else
      class="avatar-circle"
    >
      <img src="/assets/icons/empty-avatar.svg" alt="Fallback Avatar">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UserAvatar',
  props: {
    userImage: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const fallbackImage = '/assets/icons/empty-avatar.svg';
    const currentImage = ref(props.userImage || fallbackImage);
    const hasError = ref(false);

    const handleImageError = () => {
     hasError.value=true
    };
    return {
      currentImage,
      handleImageError,
      hasError
    };
  },
});
</script>

<style scoped>
.avatar-circle {
  align-items: center;
  background: #0A7FAE;
  border-radius: 30px;
  display: flex;
  /* height: 30px; */
  justify-content: center;
  /* width: 30px; */
  height: 2.25rem;
  width: 2.25rem;
}

.avatar-img {
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 2.25rem;
}
</style>
