//import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadScript from "vue-plugin-load-script"

import {initializeApp} from 'firebase/app'
import { createChart } from 'lightweight-charts'

//firebase.initializeApp(config);


const firebaseConfig = {
    apiKey: "AIzaSyBt6bUKbnTxy0G3NlHvJp4goDrReG6qC5M",
    authDomain: "doubleclick-461f4.firebaseapp.com",
    projectId: "doubleclick-461f4",
    storageBucket: "doubleclick-461f4.appspot.com",
    messagingSenderId: "1027269140602",
    appId: "1:1027269140602:web:98606ef4d11188ffff5bc3"
  };

//firebase.initializeApp(config);
initializeApp(firebaseConfig);

createApp(App).use(store).use(LoadScript).use(router).mount('#app');


