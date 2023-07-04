import { createApp } from 'vue'
import i18n from './locales/index'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store';
import Header from './components/Header.vue';

const app = createApp(App);

app.component('app-header', Header);

app.use(i18n).use(router).use(store).mount('#app')
