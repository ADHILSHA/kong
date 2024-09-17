<template>
  <div
    v-if="users?.length"
    class="avatar-wrapper"
  >
    <!-- Counter for additional avatars -->
    <div
      v-if="extraCount > 0"
      class="avatar-circle counter font-semibold text-xs extra-count"
    >
      +{{ extraCount }}
    </div>
    <!-- Avatars: Last one on top -->
    <UserAvatar
      v-for="(user, index) in displayedUsers"
      :key="index"
      class="avatar"
      :style="{ zIndex: displayedUsers.length - index }"
      :user-image="user?.avatar"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'
import type { User } from '@/types/Service'
import UserAvatar from './UserAvatar.vue'

export default defineComponent({
  name: 'MultiUserAvatar',
  components: {
    UserAvatar,
  },
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true,
    },
  },
  setup(props) {
    const displayedUsers = computed(() => props.users.filter(u => u?.avatar).slice(0, 2))
    const extraCount = computed(() => props.users.length - 2)
    return {
      displayedUsers,
      extraCount,
    }
  },
})
</script>

  <style scoped>
  .avatar-wrapper {
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
  }

  /* Style for the avatars */
  .avatar {
    border-radius: 50%;
    height: 2.25rem;
    margin-left: -0.75rem;
    width: 2.25rem;
  }

  /* Ensure the counter is on top of the avatars */
  .avatar-circle {
    align-items: center;
    background: #F1F1F8;
    border: 1px solid #fff;
    border-radius: 50%;
    color: #777D8A;
    display: flex;
    font-size: 0.75rem;
    height: 2.25rem;
    justify-content: center;
    left: 0; /* Position at the left */
    position: absolute; /* Position the counter absolutely within the wrapper */
    top: 0; /* Position at the top */
    width: 2.25rem;
    z-index: 3;
  }

  /* Adjust the margin for the first avatar */
  .avatar:first-child {
    margin-left: 0; /* No margin for the first avatar */
  }
  .extra-count{
    margin-left: -35px; /* No margin for the first avatar */
  }
  </style>
