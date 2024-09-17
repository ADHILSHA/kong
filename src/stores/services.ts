import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Service } from '@/types/Service'


export const useServiceStore = defineStore('services',()=>{
  const services = ref<Service[]>([])
  const loading = ref<boolean>(false)
  const error = ref<boolean>(false)
  const fetchServices = async (queryParams: Record<string, any> = {}): Promise<void> => {
    try {
      // Initialize loading state
      loading.value = true

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
  return {
    services,
    loading,
    error,
    fetchServices,
  }

})