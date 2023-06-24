import { createApp } from 'vue'
import i18n from './locales/index'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(i18n).use(router).mount('#app')
