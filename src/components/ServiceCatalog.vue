<template>
  <div class="service-catalog">
    <div
      ref="dynamicHeader"
      class="header-container"
    >
      <PageHeader title="Service Hub">
        <div class="description text-md font-normal">
          Organize services, manage and track versioning and API service documentation.

          <a href="#">Learn more</a>
        </div>
      </PageHeader>
      <div class="flex flex-auto-dir">
        <SearchBar
          v-model="searchQuery"
          class="search-bar flex-grow"
        />
        <div class="btn-container">
          <CustomButton
            icon="/assets/icons/plus.svg"
            title="Service Package"
          />
        </div>
      </div>
    </div>
    <!-- Loading Indicator -->
    <div
      v-if="loading"
      class="loading"
    >
      Loading services...
    </div>

    <!-- Service List -->

    <div
      v-else-if="services?.length"
      class="page-container"
      :style="{ '--dynamic-height': dynamicHeight + 'px' }"
    >
      <div class="service-container">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          class="cursor-pointer"
          :service="service"
          @click="handleOpenPopup(service)"
        />
      </div>
      <div class="flex justify-center">
        <PaginationBar />
      </div>
    </div>


    <!-- No Services Message -->
    <div
      v-else
      data-testid="no-results"
    >
      No services
    </div>

    <CustomModal
      v-model="openPopup"
      @close="handleClosePopup"
    >
      <ServiceDetails :service="currentService" v-if="currentService" />
    </CustomModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, nextTick, onUnmounted } from 'vue'
import { useServiceStore } from '@/stores/services'
import ServiceCard from './ServiceCard.vue'
import PageHeader from './PageHeader.vue'
import SearchBar from './SearchBar.vue'
import CustomButton from './CustomButton.vue'
import { useDebounce } from '@/composables/useDebounce'
import CustomModal from './CustomModal.vue'
import ServiceDetails from './ServiceDetails.vue'
import type { Service } from '@/types/Service'
import PaginationBar from './PaginationBar.vue'
import { useRouter } from 'vue-router'


export default defineComponent({
  name: 'ServiceCatalog',
  components: {
    ServiceCard,
    PageHeader,
    SearchBar,
    CustomButton,
    CustomModal,
    ServiceDetails,
    PaginationBar,
  },
  setup() {
    const router = useRouter()
    // Access the service store
    const serviceStore = useServiceStore()
    const openPopup = ref(false)
    const currentService = ref<Service>()
    const dynamicHeight = ref(0)
    const dynamicHeader = ref<HTMLElement | null>(null)
    const updateDynamicHeight = () => {
      if (dynamicHeader.value) {
        dynamicHeight.value = dynamicHeader.value.offsetHeight
      }
    }
    const handleClosePopup = () => {
      openPopup.value = false
      const { id, ...queryParams } = router.currentRoute.value.query
      router.push({ query: queryParams })
    }
    onMounted(() => {
      updateDynamicHeight()
      nextTick(() => {
        window.addEventListener('resize', updateDynamicHeight)
      })
    })


    onUnmounted(() => {
      window.removeEventListener('resize', updateDynamicHeight)
    })
    // Fetch services from the store when the component is mounted
    const searchQuery = ref()
    const debouncedFetchServices = useDebounce(async (query: string) => {
      await serviceStore.fetchServices(query ? { q: query } : {})
    }, 500)



    // Watch the searchQuery for changes and fetch data accordingly
    watch(searchQuery, async (newQuery) => {
      debouncedFetchServices(newQuery)
    }, { immediate: true }) // Trigger fetch on component mount
    const handleOpenPopup = (ser: Service) => {
      // if (ser.versions?.length) {
      currentService.value = ser
      openPopup.value = true
      // Set the query parameter
      router.push({ query: { ...router.currentRoute.value.query, id: ser.id } })
      // }
    }
    // Using computed to ensure reactivity
    const services = computed(() => serviceStore.paginatedServices)
    const loading = computed(() => serviceStore.loading)

    // Watch for changes in services and serviceId
    const serviceId = computed(() => router.currentRoute.value.query.id as string)
    watch([computed(() => serviceStore.services), serviceId], ([services, id]) => {
      if (services.length && id) {
        const matchedService = services.find(service => service.id === id)
        if (matchedService) {
          currentService.value = matchedService
          openPopup.value = true // Open the popup
        }
      }
    })



    return {
      services, // Use services from the store
      loading, // Use loading state from the store
      searchQuery,
      openPopup,
      currentService,
      dynamicHeight,
      dynamicHeader,
      handleOpenPopup,
      handleClosePopup,
    }
  },
})
</script>

<style lang="scss" scoped>
.page-container {
  /* Remaining height below the header */
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px - 1.5rem - var(--dynamic-height));
}

.service-catalog {
  padding: 0 20px;

}

.header-container {
  display: grid;
  gap: 4.5rem;
  /* Add gap between columns if needed */
  grid-template-columns: 2fr 1fr;
  /* Define three columns */
  padding-top: 1.5rem;
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
  flex: 1;
  gap: 2.5rem;
  /* Space between cards */
  grid-template-columns: repeat(3, 1fr);
  /* 3 columns by default */
  grid-template-rows: auto;
  /* Allow rows to adjust based on content */
  margin-top: 1.5rem;
  /* Takes up remaining space above Div 2 */
  overflow-y: auto;
  /* Makes it scrollable */
  // padding: 16px;

}

.btn-container {
  height: fit-content;
  padding-left: 1.5rem;
}



@media (max-width: 1024px) {
  .service-container {
    grid-template-columns: repeat(2, 1fr);
    /* 2 columns on medium screens */
  }

  .header-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .service-container {
    grid-template-columns: 1fr;
    /* 1 column on small screens */
  }

  .header-container {
    gap: 0.5rem;
    grid-template-columns: 1fr;
  }

  .btn-container {

    padding-left: 0px;
    padding-top: 1.5rem;
  }

  .page-container {
    height: auto;
  }

}
</style>
