import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Service } from '@/types/Service'


export const useServiceStore = defineStore('services',()=>{
  const services = ref<Service[]>([])
  const loading = ref<boolean>(false)
  const error = ref<boolean>(false)
  const fetchServices = async (): Promise<any> => {
    try {
      // Initialize loading state
      loading.value = true

      // Fetch data from the API
      const { data } = await axios.get('/api/services')

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