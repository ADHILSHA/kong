<template>
  <header>
    <NavBar />
  </header>
  <main class="main-content">
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'
import '@/assets/styles/global.css'

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
  },
})
</script>

<style>
/* Unscoped styles for html and body*/
html {
  font-size: 16px;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
}

.main-content {
  margin-top: 70px;
  /*the height of header*/
}
</style>
