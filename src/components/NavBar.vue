<template>
  <div class="nav-container">
    <div>
      <img src="/assets/logo/logo.svg" alt="Logo">
    </div>
    <div class="menu-wrapper">
      <div class="menu-toggle" @click="toggleMenu">
        <img src="/assets/icons/menu.svg" alt="Menu">
      </div>
      <div class="nav-menu" :class="isMenuOpen?'is-active':''">
        <div class="nav-link cursor-pointer" :class="currentRoute === 'organisations' ? 'nav-active' : ''" @click="goToPage('/organisations')">
          <img class="nav-icon" src="/assets/icons/organisation.svg" alt="Organisation">
          <div>Organisation</div>
        </div>
        <div class="nav-link cursor-pointer" :class="currentRoute === 'settings' ? 'nav-active' : ''" @click="goToPage('/settings')">
          <img class="nav-icon" src="/assets/icons/settings.svg" alt="Settings">
          <div>Settings</div>
        </div>
        <div class="nav-link cursor-pointer" :class="currentRoute === 'home' ? 'nav-active' : ''" @click="goToPage('/')">
          <user-avatar class="avatar" />
          <div>Catherine</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent,computed,ref } from 'vue'
import UserAvatar from './UserAvatar.vue'
import { useRoute,useRouter } from 'vue-router'
export default defineComponent({
  name: 'NavBar',
  components: {
    UserAvatar,
  },
  setup() {
    const route = useRoute()
    const router= useRouter()
    const isMenuOpen = ref(false);
    // Check if a specific route parameter is present
const currentRoute = computed(() => route.name)
const goToPage=(path:string)=>{
  router.push(path)
}
const toggleMenu = () => {
 
      isMenuOpen.value = !isMenuOpen.value
     
    };
return {
  currentRoute,
  goToPage,
  toggleMenu,
  isMenuOpen
}
  },

})
</script>
<style lang="css" scoped>
.nav-container {
  align-items: center;
  background: linear-gradient(180deg, #09224F 0%, #073382 100%);
  display: flex;
  height: 70px;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}

.menu-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}

.menu-toggle {
  display: none;
  cursor: pointer;
  margin-right: 20px;
}

.nav-menu {
  display: flex;
  gap: 8px;
}

.nav-link {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-size: 15px;
  font-weight: 600;
  height: 100%;
  line-height: 70px;
  opacity: 0.8;
  padding: 0px 20px;
}

.nav-active {
  background: #072863;
  opacity: 1;
}

.nav-icon {
  margin-right: 12px;
}

.avatar {
  margin-right: 16px;
}
.menu-toggle img{
  height:2rem;
  width:2rem;
}
/* Mobile styles */
@media (max-width: 768px) {
  .menu-wrapper {
    flex-direction: column;
    align-items: end;
    width: 100%;
    justify-content: center;
  }
  
  .nav-menu {
    display: none;
    flex-direction: column;
    width: 100%;
    background: #073382;
    position: absolute;
    top: 70px; /* Adjust based on the height of your nav bar */
    left: 0;
    z-index: 20;
  }

  .is-active {
    display: block;
  }

  .menu-toggle {
    display: block;
  }

  .nav-link {
    padding: 15px;
    border-bottom: 1px solid #ffffff;
  }

  .nav-link:last-child {
    border-bottom: none;
  }
}

</style>