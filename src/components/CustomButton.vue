<template>
<div class="flex cursor-pointer button-container gap-1 justify-center">
    <img :src="icon" v-if="icon" class="btn-icon " />
    <div class="font-semibold text-md">
        {{ title }}
    </div>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name:"CustomButton",
    props:{
        title:{
            type:String,
            required:true
        },
        icon:{
            type:String,
            required:false
        }
    }
})
</script>

<style scoped>
.btn-icon{
    height:1.25rem;
    width:1.25rem;
}
.button-container{
     height: fit-content; 
    color: #fff;
    background: var(--secondary-color);
    padding: 1rem 1.5rem;
    border-radius: 2rem;
    width: max-content;
}

</style>