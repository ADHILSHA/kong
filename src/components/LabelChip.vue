<template>
  <div class="label-wrapper text-sm font-semibold">
    {{ label }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LabelChip',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  setup() {
  },
})
</script>
<style>
.label-wrapper {
  background-color: var(--background-secondary);
  border-radius: 1rem;
  color: var(--primary-color);
  padding: 0.25rem 1rem
}
</style>