<template>
  <div class="absolute left-8 top-8 hover:shadow-lg">
    <img class="w-14 " src="./assets/logo.png" alt="logo" />
  </div>
  <div class="flex gap-4">
    <Card :img="kakiImage" :name="'kaki'"/>
    <Card :img="elephantImage" :name="'elephant'"/>
    <Card :img="beeImage" :name="'bee'"/>
    <Card :img="pelicanImage" :name="'pelican'"/>
  </div>
  <div class="flex justify-center mt-8">
    <canvas width="200" height="200" ref="canvas"></canvas>
  </div>
  <div class="flex justify-center gap-8 mt-8">
    <button @click="randomImages">随机一个</button>
    <button @click="overlayAndDownload">下载</button>
  </div>
</template>

<script setup>
import Card from './components/Card.vue'
import kakiImage from './assets/logo.png';
import elephantImage from '/elephant/logo.png';
import beeImage from '/bee/logo.png';
import pelicanImage from '/pelican/logo.png';
import { ref, onMounted } from 'vue';
import { ElephantStyleList, ElephantStyleCount } from './const';

const canvas = ref(null);

const getRandomImageFromFolder = (folder) => {
  const randomIndex = Math.floor(Math.random() * ElephantStyleCount[folder]);
  const randomImagePath = `/elephant/${folder}/${randomIndex + 1}.png`;
  return randomImagePath;
};

const overlayImages = async () => {
  const ctx = canvas.value.getContext('2d');

  const imagePromises = ElephantStyleList.map((folder) => {
    return new Promise(async (resolve) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      const module = await import(getRandomImageFromFolder(folder));
      image.src = module.default;
    });
  });

  const images = await Promise.all(imagePromises);

  images.forEach((image) => {
    ctx.drawImage(image, 0, 0, canvas.value.width, canvas.value.height);
  });
};

const download = () => {
  const link = document.createElement('a');
  link.href = canvas.value.toDataURL();
  link.download = 'overlay.png';
  link.click();
};

const overlayAndDownload = async () => {
  // await overlayImages();
  download();
};

const randomImages = () => {
  overlayImages();
};

onMounted(() => {
  overlayImages();
});

</script>



<style scoped>
</style>
