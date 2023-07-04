<template>
    <div class="absolute left-4 top-4 md:left-8 md:top-8 flex items-center cursor-pointer" @click="toHome">
        <img class="w-14 rounded-full hover:shadow-lg " src="@/assets/logo.gif" alt="logo" />
        <h2 class="text-left pl-3">Random <br> Cute Avatar</h2>
    </div>
    <!-- switch zh/en language-->
    <div class="absolute rounded-full right-4 top-6 md:right-8 md:top-10 hover:shadow-lg">
        <button
            class="bg-white text-black border-solid border-black border-2 focus:ring-2 focus:ring-offset-2 focus:ring-black rounded-full text-xs"
            @click="switchLanguage">{{ currentLanguage }}</button>
    </div>
</template>
  
<script setup>
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { computed, onMounted } from 'vue';
import router from '../router';
const {locale } = useI18n({ useScope: 'global' })
const store = useStore();
const currentLanguage = computed(() => store.getters.currentLanguage);
const switchLanguage = () => {
    if (currentLanguage.value === 'EN') {
        store.commit('setLanguage', 'CN');
        locale.value = 'en';
    } else {
        store.commit('setLanguage', 'EN');
        locale.value = 'zh';
    }
}
const toHome = () => {
    router.push({ path: '/' });
}
onMounted(() => {
    if (currentLanguage.value === 'EN') {
        locale.value = 'zh';
    } else {
        locale.value = 'en';
    }
})
</script>

<style>

</style>
  