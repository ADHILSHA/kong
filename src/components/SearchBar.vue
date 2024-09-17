<template>
    <div class="input-wrapper w-full">
  <!-- <div class="icon"> -->
    <img src="/assets/icons/search.svg" alt="icon" class="icon">
  <!-- </div> -->
  <input type="text" placeholder="Search" class="custom-input">
</div>

</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name:"SearchBar"
})
</script>
<style>
.input-wrapper {
  position: relative; /* Position relative to contain the icon */
  display: flex;
  border:1px solid #E7E7EC;
  background: #fff;
  border-radius:4px;
  padding:0.625rem 0rem;
  height: fit-content;
  align-items: center;
}
.input-wrapper .icon{
    height: 1rem;
 width:1rem;
 pointer-events: none;
 padding-left:10px;
} 
.input-wrapper input {
  padding-left: 8px; /* Add padding to make space for the icon */
  height: 2rem; /* Adjust input height if needed */
  /* border-color: #E7E7EC; */
  outline: none;
  border: none;
  width: 100%;
}
.custom-input:focus {
  border-color: none; /* Change border color on focus */
  outline: none; /* Change outline color and size on focus */
  outline-offset: 2px; /* Optional: create space between border and outline */
}
.custom-input::placeholder {
  color: #777; /* Change the placeholder color */
  font-family: 'Inter', sans-serif; /* Change the placeholder font */
  font-size: 0.875; /* Change the placeholder font size */
}
</style>