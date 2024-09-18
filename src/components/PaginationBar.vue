<template>
    <div class="flex justify-between items-center nav-container">
        <div class="nav-page-btn flex justify-center align-center cursor-pointer"  @mouseover="isPrevHovered = true"
        @mouseleave="isPrevHovered = false" @click="prevPage" :class="isFirstPage?'pointer-events-none':''">
           <img :src="isPrevHovered?'/assets/icons/prev-active.svg':'/assets/icons/prev.svg'" class="prev-icon"/>
        </div>
        <div class="text-sm font-semibold text-secondary flex items-center ">
           <div ><span class="text-primary">{{ currentPage }} to {{ totalPages }} </span> of {{ totalServices }} services</div>  
        </div>
        <div class="nav-page-btn flex justify-center align-center cursor-pointer" @mouseover="isNextHovered = true"
        @mouseleave="isNextHovered = false" @click="nextPage" :class="isLastPage?'pointer-events-none':''">
           <img :src="isNextHovered?'/assets/icons/next-active.svg':'/assets/icons/next.svg'" class="prev-icon"/>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent,ref,computed } from 'vue';
    import { useServiceStore } from '@/stores/services'
    export default defineComponent({
        name:"PaginationBar",
        setup(){
            const serviceStore= useServiceStore()
            const isPrevHovered=ref<Boolean>(false)
                const isNextHovered=ref<Boolean>(false)
                    const currentPage = computed(() => serviceStore.currentPage)
    const totalPages = computed(() => serviceStore.totalPages);
    const isFirstPage = computed(() => currentPage.value <= 1);
    const isLastPage = computed(() => currentPage.value >= totalPages.value);
    const totalServices = computed(()=>serviceStore.totalServices)
    const nextPage=()=>{
      if (!isLastPage.value) {
        serviceStore.setPage(currentPage.value+1)
      }
    }
    const prevPage = () => {
      if (!isFirstPage.value) {
        serviceStore.setPage(currentPage.value - 1);
      }
    };
                return{
                    isPrevHovered,
                    isNextHovered,
                    nextPage,
                    prevPage,
                    currentPage,
                    totalPages,
                    totalServices,
                    isFirstPage,
                    isLastPage
                }
        }

    })
</script>
<style scoped>
.nav-page-btn{
    height: 2.75rem;
    width:2.75rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius:2.75rem;
}
.nav-page-btn:hover{
    border: 1px solid rgba(166, 198, 255, 1)
}
.prev-icon{
    width:1.125rem;
    height:1.25rem;
}
.nav-container{
    width:262px;
    margin:1.5rem 0;
}
</style>