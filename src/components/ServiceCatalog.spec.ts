import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useServiceStore } from '@/stores/services'
import { nextTick } from 'vue'
import ServiceCatalog from '@/components/ServiceCatalog.vue'
import type { Service } from '@/types/Service'
import { createRouter, createMemoryHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Define routes for the mock router
const routes: RouteRecordRaw[] = [
  { path: '/', component: ServiceCatalog }
]

const mockServices: Service[] = [
  {
    id: '1',
    name: 'Service A',
    description: 'This is Service A.',
    type: 'REST',
    published: true,
    configured: true,
    versions: [
      {
        id: 'v1',
        name: 'Version 1.0',
        description: 'Initial release',
        updated_at: '2024-01-01T00:00:00Z',
        developer: {
          id: 'u1',
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          avatar: 'https://example.com/avatars/alice.jpg'
        }
      }
    ],
    metrics: {
      latency: 120,
      uptime: 99.9,
      requests: 10000,
      errors: 5
    }
  },
  {
    id: '2',
    name: 'Service B',
    description: 'This is Service B.',
    type: 'HTTP',
    published: false,
    configured: true,
    versions: [
      {
        id: 'v2',
        name: 'Version 2.0',
        description: 'New features added',
        updated_at: '2024-02-01T00:00:00Z',
        developer: {
          id: 'u2',
          name: 'Bob Smith',
          email: 'bob.smith@example.com',
          avatar: 'https://example.com/avatars/bob.jpg'
        }
      }
    ],
    metrics: {
      latency: 150,
      uptime: 98.5,
      requests: 8000,
      errors: 10
    }
  }
]

describe('ServiceCatalog.vue', () => {
  it('renders loading state correctly', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    // Mount the component with the testing Pinia instance and router
    const wrapper = mount(ServiceCatalog, {
      global: {
        plugins: [createTestingPinia(), router],
      },
    })

    // Access the store and set the loading state
    const serviceStore = useServiceStore()
    serviceStore.loading = true

    await nextTick()

    // Check if the loading indicator is rendered
    expect(wrapper.find('.loading').text()).toBe('Loading services...')
  })

  it('renders services correctly', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    // Mount the component with the testing Pinia instance and router
    const wrapper = mount(ServiceCatalog, {
      global: {
        plugins: [createTestingPinia(), router],
      },
    })

    // Access the store and set the services state
    const serviceStore = useServiceStore()
    serviceStore.services = mockServices

    await nextTick()

    // Check if services are rendered
    const serviceCards = wrapper.findAllComponents({ name: 'ServiceCard' })
    expect(serviceCards.length).toBe(mockServices.length)
  })

  it('opens and closes the modal correctly', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    const wrapper = mount(ServiceCatalog, {
      global: {
        plugins: [createTestingPinia(), router],
      },
    })

    // Access the store and set the services state
    const serviceStore = useServiceStore()
    serviceStore.services = mockServices

    await nextTick()

    // Simulate clicking on a service to open the modal
    const serviceCard = wrapper.findComponent({ name: 'ServiceCard' })
    await serviceCard.trigger('click')

    await nextTick()

    expect(wrapper.find('[data-test="custom-modal"]').exists()).toBe(true)

    const closeButton = wrapper.find('[data-test="custom-modal"]')
    await closeButton.trigger('click')

    await nextTick()

    expect(wrapper.find('[data-test="custom-modal"]').exists()).toBe(false)
  })

  it('handles empty service state correctly', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    // Mount the component with the testing Pinia instance and router
    const wrapper = mount(ServiceCatalog, {
      global: {
        plugins: [createTestingPinia(), router],
      },
    })

    // Access the store and set the services state to an empty array
    const serviceStore = useServiceStore()
    serviceStore.services = []

    await nextTick()

    // Check if the "No services" message is rendered
    expect(wrapper.find('[data-testid="no-results"]').text()).toBe('No services')
  })
})



