import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


/* firebase code that Doesn't work due to dependency issues
import firebase from 'firebase' 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWDT5wUs1t-NAOcR3fTbvoTeDbwwb62X0",
  authDomain: "doubleclickt30.firebaseapp.com",
  projectId: "doubleclickt30",
  storageBucket: "doubleclickt30.appspot.com",
  messagingSenderId: "1036356833168",
  appId: "1:1036356833168:web:3769e4492d0c41782cad15",
  measurementId: "G-YKVXPSBY1R"
};

// Initialize Firebase
firebase.initalizeApp(firebaseConfig);
*/

createApp(App).use(router).mount('#app')
