<template>
  <app-header></app-header>
  <!-- <div class="flex gap-4">
    <Card @click="selectType(0)" :img="kakiImage" :name="'kaki'" /> -->
    <!-- <Card @click="selectType(1)" :img="elephantImage" :name="'elephant'" />
    <Card @click="selectType(2)" :img="beeImage" :name="'bee'" />
    <Card @click="selectType(3)" :img="pelicanImage" :name="'pelican'" />
  </div> -->
  <div class="flex justify-center mt-48">
    <canvas width="200" height="200" ref="canvas"></canvas>
  </div>
  <div class="flex justify-center gap-8 mt-8">
    <button
      class="bg-white text-black border-solid border-black border-2 focus:ring-2 focus:ring-offset-2 focus:ring-black rounded-full"
      @click="randomImages">{{$t(`message.Random`)}}</button>
    <button class="text-white bg-black" @click="download">{{$t(`message.Download`)}}</button>
  </div>
  <div class="w-full text-center mt-20 md:mt-36">
    <p class="text-black text-sm md:text-base">{{$t(`message.API`)}} <a class="font-semibold underline" href="/api">API</a></p>
    <p class="text-gray-600 text-sm md:text-base">Designer <a href="https://www.mylittlefox.art" target=”_blank”>mylittlefox</a> and Developer <a href="https://www.github.com/blackboxo" target=”_blank”>blackboxo</a></p>
  </div>
  <div class="modal-wrapper" v-show="showModal" @click="closeModal">
    <Modal @closeModal="closeModal">
      <img class="p-6" :src="savedImageUrl" alt="Saved Image">
    </Modal>
  </div>
  <canvas class="hidden" width="1024" height="1024" ref="tempCanvas" id="tempCanvas"></canvas>
  <!-- footer -->
</template>

<script setup>
// import Card from '@/components/Card.vue';
// import kakiImage from '@/assets/logo.png';
// import elephantImage from '/elephant/logo.png';
// import beeImage from '/bee/logo.png';
// import pelicanImage from '/pelican/logo.png';
import Modal from '@/components/Modal.vue';
import { ref, onMounted } from 'vue';
import { AvatarTypes, StyleList, StyleCount, StyleMatch, CompatibleAgents } from '@/const';
import { useI18n } from 'vue-i18n';

const canvas = ref(null);
const tempCanvas = ref(null);
var ctype = 0;
var cnumber = {};
var images;
var showModal = ref(false);
var savedImageUrl = ref('');

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
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isNeedCompatible = CompatibleAgents.some(
    (agent) => userAgent.indexOf(agent) >= 0,
  );

  if (isNeedCompatible) {
    openModal();
    var tCanvas = document.getElementById('tempCanvas');
    var image = tCanvas.toDataURL('image/png');
    console.log(image)
    savedImageUrl.value = image;
  } else {
    const link = document.createElement('a');
    link.href = tempCanvas.value.toDataURL();
    // generate random name
    link.download = `cute-random-avatar-${Math.random().toString(12).substring(2, 9)}.png`;
    link.click();
  }
};

const preloadImages = () => {
  var currentStyleList = StyleList[AvatarTypes[ctype]];

  currentStyleList.forEach((folder) => {
    for (let i = 0; i < StyleCount[AvatarTypes[ctype]][folder]; i++) {
      const image = new Image();
      const url = `/${AvatarTypes[ctype]}/${folder}/${i}.png`
      const module = new URL(url, import.meta.url).href;
      image.src = module;
    }
  });
}

const randomImages = () => {
  overlayImages();
};

// const selectType = (t) => {
//   ctype = t;
//   overlayImages();
// };

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
}

onMounted(() => {
  overlayImages();
  preloadImages();
});

</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
</style>
