//import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadScript from "vue-plugin-load-script";

createApp(App).use(store).use(LoadScript).use(router).mount('#app');

