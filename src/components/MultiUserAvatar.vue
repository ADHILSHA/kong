<template>
    <div class="avatar-wrapper" v-if="users?.length">
      <!-- Counter for additional avatars -->
      <div class="avatar-circle counter font-semibold text-xs extra-count" v-if="extraCount > 0">
        +{{ extraCount }}
      </div>
      <!-- Avatars: Last one on top -->
      <UserAvatar
        v-for="(user, index) in displayedUsers"
        :key="index"
        :user-image="user?.avatar"
        class="avatar"
        :style="{ zIndex: displayedUsers.length - index }" 
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import type { PropType } from 'vue';
  import type { User } from '@/types/Service';
  import UserAvatar from './UserAvatar.vue';
  
  export default defineComponent({
    name: 'MultiUserAvatar',
    props: {
      users: {
        type: Array as PropType<User[]>,
        required: true,
      },
    },
    components: {
      UserAvatar,
    },
    setup(props) {
      const displayedUsers = computed(() => props.users.filter(u => u?.avatar).slice(0, 2));
      const extraCount = computed(() => props.users.length - 2);
      return {
        displayedUsers,
        extraCount,
      };
    },
  });
  </script>
  
  <style scoped>
  .avatar-wrapper {
    display: flex;
    align-items: center;
    justify-content: center; 
    position: relative; 
  }
  
  /* Style for the avatars */
  .avatar {
    height: 2.25rem; 
    width: 2.25rem;
    border-radius: 50%; 
    margin-left: -0.75rem; 
  }
  
  /* Ensure the counter is on top of the avatars */
  .avatar-circle {
    position: absolute; /* Position the counter absolutely within the wrapper */
    top: 0; /* Position at the top */
    left: 0; /* Position at the left */
    background: #F1F1F8;
    color: #777D8A;
    border: 1px solid #fff;
    border-radius: 50%;
    height: 2.25rem; 
    width: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem; 
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
  