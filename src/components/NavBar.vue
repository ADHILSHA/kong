<template>
  <div class="nav-container">
    <div>
      <img src="/assets/logo/logo.svg">
    </div>
    <div class="menu-wrapper">
      <div class="nav-link">
        <img
          class="nav-icon"
          src="/assets/icons/organisation.svg"
        >
        <div>Organisation</div>
      </div>
      <div class="nav-link">
        <img
          class="nav-icon"
          src="/assets/icons/settings.svg"
        >
        <div>Settings</div>
      </div>
      <div class="nav-link nav-active">
        <user-avatar class="avatar" />
        <div>Catherine</div>
      </div>
    </div>
  </div>
</template>
<script land="ts">
import { defineComponent } from 'vue'
import UserAvatar from './UserAvatar.vue'
export default defineComponent({
  name: 'NavBar',
  components: {
    UserAvatar,
  },
  setup() {

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
  z-index: 10
}

.menu-wrapper {
  align-items: center;
  display: flex;
  gap: 8px;
  height: 100%;

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
  padding: 0px 20px 0px 20px;


}

.span {
  display: inline-block;
  line-height: 18.15px;
  vertical-align: middle;
}

.nav-active {
  background: #072863;
}

.nav-icon {
  margin-right: 12px;
}

.avatar {
  margin-right: 16px;
}
</style>