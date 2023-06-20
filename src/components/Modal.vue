<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 p-6 " @click="closeModal">
      <div class="bg-white rounded-lg shadow-xl" @click.stop>
        <!-- Modal内容 -->
        <slot></slot>
        <p class="text-black mb-4 text-xl">长按保存图片</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false
      };
    },
    methods: {
      openModal() {
        this.isOpen = true;
      },
      closeModal() {
        this.isOpen = false;
      }
    }
  };
  </script>
  