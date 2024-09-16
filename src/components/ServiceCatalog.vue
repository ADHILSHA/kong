<template>
  <div class="service-catalog">
    <h1 class="text-xl font-bold text-primary">
      Service Hub
    </h1>
    <!-- <input
      v-model="searchQuery"
      class="search-input"
      data-testid="search-input"
      placeholder="Search services"
    > -->

    <!-- Loading Indicator -->
    <div
      v-if="loading"
      class="loading"
    >
      Loading services...
    </div>

    <!-- Service List -->
    <div
      v-else-if="services.length"
      class="service-container"
    >
      <ServiceCard
        v-for="service in services"
        :key="service.id"
        :service="service"
      />
      <!-- <ServiceCard :service="service"/> -->
      <!-- <div>
          <p>
            {{ service.name }}
          </p>
          <p>{{ service.description }}</p>
        </div> -->
      <!-- </div> -->
    </div>

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
import ServiceCard from './ServiceCard.vue'
export default defineComponent({
  name: 'ServiceCatalog',
  components:{
    ServiceCard,
  },
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
  padding: 0 20px;

}

.catalog {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 20px 0 0 0;
}

.service {
  // border: 1px solid #999;
  background: #FFFFFF;
  border-radius: 40px;
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

.service-container {
  display: grid;
  gap: 2.5rem; /* Space between cards */
  grid-template-columns: repeat(3, 1fr); /* 3 columns by default */
  grid-template-rows: auto;  /* Allow rows to adjust based on content */
  // padding: 16px;

}



@media (max-width: 1024px) {
  .service-container {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on medium screens */
  }
}

@media (max-width: 768px) {
  .service-container {
    grid-template-columns: 1fr; /* 1 column on small screens */
  }
}

</style>
