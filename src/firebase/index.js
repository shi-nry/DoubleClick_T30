//file by nicholas rinehart
// below is the code that links our project to firebase

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDwSI7_3_90og5I2OiBIwA96r0iJvzKHH8",
  authDomain: "doubleclick-fd018.firebaseapp.com",
  projectId: "doubleclick-fd018",
  storageBucket: "doubleclick-fd018.appspot.com",
  messagingSenderId: "358944323123",
  appId: "1:358944323123:web:4aca785994f351c78ad546",
  measurementId: "G-YSB11SYR11"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth }