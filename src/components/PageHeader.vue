<template>
  <div class="text-primary">
    <div class="text-xl font-bold heading">
      {{ title }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  setup() {

  },

})
</script>
<style scope>
.heading {
    margin-bottom: 1rem;
}
</style>