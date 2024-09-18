<template>
  <div>
    <img
      v-if="userImage && !hasError"
      alt="User Avatar"
      class="avatar-img"
      :src="userImage"
      :style="avatarStyles"
      @error="handleImageError"
    >
    <div
      v-else
      class="avatar-circle"
      :style="avatarStyles"
    >
      <img
        alt="Fallback Avatar"
        src="/assets/icons/empty-avatar.svg"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'UserAvatar',
  props: {
    userImage: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 2.25,
    },
  },
  setup(props) {
    const fallbackImage = '/assets/icons/empty-avatar.svg'
    const currentImage = ref(props.userImage || fallbackImage)
    const hasError = ref(false)

    const handleImageError = () => {
      hasError.value = true
    }
    // Computed property to generate inline styles for size
    const avatarStyles = computed(() => {
      return {
        width: `${props.size}rem`,
        height: `${props.size}rem`,
        borderRadius: `${props.size}rem`,
      }
    })
    return {
      currentImage,
      handleImageError,
      hasError,
      avatarStyles,
    }
  },
})
</script>

<style scoped>
.avatar-circle {
  align-items: center;
  background: #0A7FAE;
  border-radius: 30px;
  display: flex;
  /* width: 30px; */
  /* height: 2.25rem; */
  /* height: 30px; */
  justify-content: center;
  /* width: 2.25rem; */
}

.avatar-img {
  border-radius: 2.25rem;
  /* height: 2.25rem;
  width: 2.25rem; */
}
</style>
