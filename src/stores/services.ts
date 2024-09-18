import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import axios from 'axios'
import type { Service } from '@/types/Service'


export const useServiceStore = defineStore('services',()=>{
  const services = ref<Service[]>([])
  const loading = ref<boolean>(false)
  const error = ref<boolean>(false)
  // Pagination states
  const currentPage = ref<number>(1)
  const pageSize = ref<number>(9) // Default items per page
  const fetchServices = async (queryParams: Record<string, any> = {}): Promise<void> => {
    try {
      // Initialize loading state
      loading.value = true
      currentPage.value=1

      // Create the query string from the queryParams object
      const queryString = new URLSearchParams(queryParams).toString()

      // Fetch data from the API with query parameters
      const { data } = await axios.get(`/api/services${queryString ? `?${queryString}` : ''}`)

      // Store data in Vue ref
      services.value = data
    } catch (err: any) {
      error.value = true
    } finally {
      // Reset loading state
      loading.value = false
    }
  }

  // Computed properties for pagination
  const totalPages = computed(() => Math.ceil(services.value.length / pageSize.value))
  const totalServices = computed(() =>services.value.length)
  
  const paginatedServices = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return services.value.slice(start, end)
  })

  // Method to change the current page
  const setPage = (page: number) => {
    if (page > 0 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  // Method to change the page size
  const setPageSize = (size: number) => {
    if (size > 0) {
      pageSize.value = size
      currentPage.value = 1 // Reset to the first page
    }
  }
  return {
    services,
    loading,
    error,
    fetchServices,
    currentPage,
    pageSize,
    totalPages,
    paginatedServices,
    setPage,
    setPageSize,
    totalServices
  }

})