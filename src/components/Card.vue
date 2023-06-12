<script setup>
import { ref } from 'vue'

defineProps({
  img: String,
  name: String
})

</script>

<template>
  <div>
    <div class="w-32 h-32 bg-zinc-100 rounded-t-md shadow-md flex justify-center hover:shadow-2xl">
        <img class="w-full h-fit " :src="img" alt="kaki" />
    </div>
    <div class="w-32 h-8 bg-slate-200 rounded-b-md shadow-md flex justify-center">
    <p class="text-black leading-8">{{ name }}</p>
    </div>
    </div>
</template>

<style scoped>
</style>
