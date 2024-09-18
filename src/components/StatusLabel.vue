<template>
  <div
    v-if="status"
    class="flex align-center gap-1 min-w-0 "
  >
    <img
      class="status-icon"
      :src="statusDetails.icon"
    >
    <div class="text-xs text-secondary font-light no-wrap">
      {{ statusDetails.label }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { statuses } from '@/utils/static/status'

export default defineComponent({
  name: 'StatusLabel',
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const statusData = props
    const statusDetails = statuses[statusData.status]
    return {
      statusDetails,
    }
  },
})
</script>
<style>
.status-icon {
  height: 20px;
  width: 20px;
}
</style>
