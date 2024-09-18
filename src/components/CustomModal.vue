<template>
  <div
    v-if="isVisible"
    class="popup-overlay"
    data-test="custom-modal"
    @click.self="closePopup"
  >
    <div class="popup-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'CustomModal',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const isVisible = ref(props.modelValue)

    // Watch prop to sync visibility
    watch(() => props.modelValue, (newVal) => {
      isVisible.value = newVal
    })

    const closePopup = () => {
      isVisible.value = false
      emit('update:modelValue', false)
      emit('close')

    }

    return {
      isVisible,
      closePopup,
    }
  },
})
</script>

<style scoped>
.popup-overlay {
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 999;
}

.popup-content {
    background: #fff;
    border-radius: 8px;
    max-height: 90%;
    max-width: 830px;
    overflow: auto;
    padding: 1rem;
    position: relative;
    width: 90%;
}

.close-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
}
</style>
