<template>
  <div class="flex cursor-pointer button-container gap-1 justify-center">
    <img
      v-if="icon"
      class="btn-icon "
      :src="icon"
    >
    <div class="font-semibold text-md">
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name:'CustomButton',
  props:{
    title:{
      type:String,
      required:true,
    },
    icon:{
      type:String,
      required:false,
      default:'',
    },
  },
})
</script>

<style scoped>
.btn-icon{
    height:1.25rem;
    width:1.25rem;
}
.button-container{
    background: var(--secondary-color);
    border-radius: 2rem;
    color: #fff;
    padding: 0.625rem 1.5rem;
    width: max-content;
}

</style>