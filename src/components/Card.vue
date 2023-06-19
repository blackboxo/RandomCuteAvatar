<script setup>
import { ref } from 'vue'

defineProps({
  img: String,
  name: String
})

</script>

<template>
  <div class = "rounded-t-md shadow-md hover:shadow-2xl hover:scale-105 hover:translate-x-[-3%] hover:translate-y-[-3%]">
    <div class="w-32 h-32 bg-zinc-100 flex justify-center">
        <img class="w-full h-fit " :src="img" alt="kaki" />
    </div>
    <div class="w-32 h-8 bg-slate-200 flex justify-center">
    <p class="text-black leading-8">{{ name }}</p>
    </div>
    </div>
</template>

<style scoped>
</style>
