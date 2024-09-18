<template>
  <div class="input-wrapper w-full">
    <!-- <div class="icon"> -->
    <img
      alt="icon"
      class="icon"
      src="/assets/icons/search.svg"
    >
    <!-- </div> -->
    <input
      v-model="inputValue"
      class="custom-input"
      placeholder="Search"
      type="text"
      @input="updateValue"
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'SearchBar',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue)

    // Watch the modelValue prop to keep internalValue in sync
    watch(() => props.modelValue, (newValue) => {
      inputValue.value = newValue
    })

    // Emit the new value when input changes
    const updateValue = () => {
      emit('update:modelValue', inputValue.value)
    }

    return {
      inputValue,
      updateValue,
    }
  },
})
</script>
<style>
.input-wrapper {
    align-items: center;
    background: #fff;
    border: 1px solid #E7E7EC;
    border-radius: 4px;
    display: flex;
    height: fit-content;
    padding: 0.25rem 0rem;
    position: relative;
    /* Position relative to contain the icon */
}

.input-wrapper .icon {
    height: 1rem;
    padding-left: 10px;
    pointer-events: none;
    width: 1rem;
}

.input-wrapper input {
    border: none;
    height: 2rem;
    /* Adjust input height if needed */
    /* border-color: #E7E7EC; */
    outline: none;
    padding-left: 8px;
    /* Add padding to make space for the icon */
    width: 100%;
}

.custom-input:focus {
    border-color: none;
    /* Change border color on focus */
    outline: none;
    /* Change outline color and size on focus */
    outline-offset: 2px;
    /* Optional: create space between border and outline */
}

.custom-input::placeholder {
    color: #777;
    /* Change the placeholder color */
    font-family: 'Inter', sans-serif;
    /* Change the placeholder font */
    font-size: 0.875;
    /* Change the placeholder font size */
}
</style>