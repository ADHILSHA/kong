<template>
  <div class="service-catalog">
    <h1>Service Catalog</h1>
    <input
      v-model="searchQuery"
      class="search-input"
      data-testid="search-input"
      placeholder="Search services"
    >

    <!-- Loading Indicator -->
    <div
      v-if="loading"
      class="loading"
    >
      Loading services...
    </div>

    <!-- Service List -->
    <ul
      v-else-if="services.length"
      class="catalog"
    >
      <li
        v-for="service in services"
        :key="service.id"
        class="service"
      >
        <div>
          <p>
            {{ service.name }}
          </p>
          <p>{{ service.description }}</p>
        </div>
      </li>
    </ul>

    <!-- No Services Message -->
    <div
      v-else
      data-testid="no-results"
    >
      No services
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useServiceStore } from '@/stores/services'

export default defineComponent({
  name: 'ServiceCatalog',
  setup() {
    // Access the service store
    const serviceStore = useServiceStore()
    // Fetch services from the store when the component is mounted
    onMounted(async () => {
      await serviceStore.fetchServices() // Call the action to fetch services
    })
    const searchQuery = ref('')
    // Using computed to ensure reactivity
    const services = computed(() => serviceStore.services)
    const loading = computed(() => serviceStore.loading)
    return {
      services, // Use services from the store
      loading, // Use loading state from the store
      searchQuery,
    }
  },
})
</script>

<style lang="scss" scoped>
.service-catalog {
  margin: 2rem auto;
  max-width: 1366px;
  padding: 0 20px;
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 20px 0 0 0;
}

.service {
  border: 1px solid #999;
  border-radius: 10px;
  margin: 6px;
  padding: 8px 16px;
  width: 200px;

  p:first-of-type {
    color: #333;
    font-weight: 700;
  }

  p {
    color: #666;
  }
}

input {
  padding: 8px 4px;
}

.loading {
  color: #666;
  font-size: 1.2rem;
}
</style>
