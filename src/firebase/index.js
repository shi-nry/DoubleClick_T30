//file by nicholas rinehart
// below is the code that links our project to firebase

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyBt6bUKbnTxy0G3NlHvJp4goDrReG6qC5M",
    authDomain: "doubleclick-461f4.firebaseapp.com",
    projectId: "doubleclick-461f4",
    storageBucket: "doubleclick-461f4.appspot.com",
    messagingSenderId: "1027269140602",
    appId: "1:1027269140602:web:98606ef4d11188ffff5bc3"
  };

//firebase.initializeApp(config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }