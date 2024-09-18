<template>
  <div class="flex justify-between items-center nav-container">
    <div
      class="nav-page-btn flex justify-center align-center cursor-pointer"
      :class="isFirstPage ? 'pointer-events-none' : ''"
      @click="prevPage"
      @mouseleave="isPrevHovered = false"
      @mouseover="isPrevHovered = true"
    >
      <img
        class="prev-icon"
        :src="isPrevHovered ? '/assets/icons/prev-active.svg' : '/assets/icons/prev.svg'"
      >
    </div>
    <div class="text-sm font-semibold text-secondary flex items-center ">
      <div>
        <span class="text-primary">{{ currentPage }} to {{ totalPages }} </span> of {{ totalServices }}
        services
      </div>
    </div>
    <div
      class="nav-page-btn flex justify-center align-center cursor-pointer"
      :class="isLastPage ? 'pointer-events-none' : ''"
      @click="nextPage"
      @mouseleave="isNextHovered = false"
      @mouseover="isNextHovered = true"
    >
      <img
        class="prev-icon"
        :src="isNextHovered ? '/assets/icons/next-active.svg' : '/assets/icons/next.svg'"
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useServiceStore } from '@/stores/services'
export default defineComponent({
  name: 'PaginationBar',
  setup() {
    const serviceStore = useServiceStore()
    const isPrevHovered = ref<boolean>(false)
    const isNextHovered = ref<boolean>(false)
    const currentPage = computed(() => serviceStore.currentPage)
    const totalPages = computed(() => serviceStore.totalPages)
    const isFirstPage = computed(() => currentPage.value <= 1)
    const isLastPage = computed(() => currentPage.value >= totalPages.value)
    const totalServices = computed(() => serviceStore.totalServices)
    const nextPage = () => {
      if (!isLastPage.value) {
        serviceStore.setPage(currentPage.value + 1)
      }
    }
    const prevPage = () => {
      if (!isFirstPage.value) {
        serviceStore.setPage(currentPage.value - 1)
      }
    }
    return {
      isPrevHovered,
      isNextHovered,
      nextPage,
      prevPage,
      currentPage,
      totalPages,
      totalServices,
      isFirstPage,
      isLastPage,
    }
  },

})
</script>
<style scoped>
.nav-page-btn {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 2.75rem;
    height: 2.75rem;
    width: 2.75rem;
}

.nav-page-btn:hover {
    border: 1px solid rgba(166, 198, 255, 1)
}

.prev-icon {
    height: 1.25rem;
    width: 1.125rem;
}

.nav-container {
    margin: 1.5rem 0;
    width: 262px;
}
</style>