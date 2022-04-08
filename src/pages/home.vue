<script setup>
//page creation and setup by Loren Parvin
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)

import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
  // ...
  console.log(auth.currentUser);
} else {
  // No user is signed in.
  console.log(auth.currentUser);
}
</script>

<style scoped>
    @import 'keepcalmfont.css';
</style>

<template>


<html>
<body>
<div id="home">
  <p id="layer2" class="white_header">Trading Simplified</p>
  <p class="paragraph">Doubleclick is an online trading platform that serves trades 
    to users based on their preferences and trading styles. Upon 
    account creation, you will be asked to fill out a simple 
    questionnaire about your trading preferences and tolerances. 
    Click the Create Account button below to get started!</p>

  <!-- Implemented visual assets and formatted (Colin) -->
 <!--
 <img src="../assets/main_screen/trading_simp.png" width="391" height="53" color="transparent" alt="Create Account">
  <br>
  <br>
  <img src="../assets/main_screen/welcome_desc.png" width="573" height="150" color="transparent" alt="Create Account">
  -->
  <br>
  <p class="paragraph">Get started here:</p>
  <button class="button" @click="$router.push('login')">
    <img src="../assets/gradient_buttons/create_act_btn_fixed.png" width="138" height="38" color="transparent" alt="Create Account">
  </button>
  <br>
  <br>
  <br>


  
</div>
</body>
</html>
</template>

<style scoped>
#home {
  text-align: center;
}

#template {
  height: 100%;
}

#html {
  height: 100%;

}

a {
  color: #42b983;
}
</style>
