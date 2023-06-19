<template>
  <div class="absolute rounded-full left-8 top-8 hover:shadow-lg">
    <img class="w-14 " src="./assets/logo.png" alt="logo" />
  </div>
  <div class="flex gap-4">
    <!-- <Card @click="selectType(0)" :img="kakiImage" :name="'kaki'" /> -->
    <!-- <Card @click="selectType(1)" :img="elephantImage" :name="'elephant'" />
    <Card @click="selectType(2)" :img="beeImage" :name="'bee'" />
    <Card @click="selectType(3)" :img="pelicanImage" :name="'pelican'" /> -->
  </div>
  <div class="flex justify-center mt-8">
    <canvas width="200" height="200" ref="canvas"></canvas>
  </div>
  <div class="flex justify-center gap-8 mt-8">
    <button
      class="bg-white text-black border-solid border-black border-2 focus:ring-2 focus:ring-offset-2 focus:ring-black rounded-full"
      @click="randomImages">随机一个</button>
    <button @click="overlayAndDownload">下载</button>
  </div>
  <canvas class="hidden" width="2400" height="2400" ref="tempCanvas"></canvas>
</template>

<script setup>
import Card from './components/Card.vue'
import kakiImage from './assets/logo.png';
import elephantImage from '/elephant/logo.png';
import beeImage from '/bee/logo.png';
import pelicanImage from '/pelican/logo.png';
import { ref, onMounted } from 'vue';
import { AvatarTypes, StyleList, StyleCount, StyleMatch } from './const';

const canvas = ref(null);
const tempCanvas = ref(null);
var ctype = 0;
var cnumber = {};
var images;

const getRandomImageFromFolder = (folder) => {
  let current_type = AvatarTypes[ctype];
  var randomIndex = 0;
  if (StyleMatch[current_type] && StyleMatch[current_type][folder]) {
    var matchLayer = StyleMatch[current_type][folder]['layer'];
    var randomList = StyleMatch[current_type][folder]['rule'][cnumber[matchLayer]];
    randomIndex = randomList[Math.floor(Math.random() * randomList.length)];
  } else {
    randomIndex = Math.floor(Math.random() * StyleCount[current_type][folder]);
  }
  cnumber[folder] = randomIndex;
  const randomImagePath = `/${current_type}/${folder}/${randomIndex}.png`;
  return randomImagePath;
};

const overlayImages = async () => {
  const ctx = canvas.value.getContext('2d');
  const tempCtx = tempCanvas.value.getContext('2d');
  var currentStyleList = StyleList[AvatarTypes[ctype]];
  const imagePromises = currentStyleList.map((folder) => {
    return new Promise(async (resolve) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      const module = new URL(getRandomImageFromFolder(folder), import.meta.url).href;
      image.src = module;
    });
  });

  images = await Promise.all(imagePromises);

  images.forEach((image) => {
    ctx.drawImage(image, 0, 0, canvas.value.width, canvas.value.height);
  });
};

const download = () => {
  const tempCtx = tempCanvas.value.getContext('2d');
  tempCanvas.width = images[0].width;
  tempCanvas.height = images[0].height;
  images.forEach((image) => {
    tempCtx.drawImage(image, 0, 0, tempCanvas.value.width, tempCanvas.value.height);
  });
  const link = document.createElement('a');
  link.href = tempCanvas.value.toDataURL();
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

const selectType = (t) => {
  ctype = t;
  overlayImages();
};

onMounted(() => {
  overlayImages();
});

</script>



<style scoped></style>
