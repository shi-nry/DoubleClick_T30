<script setup>
//page creation and setup by Loren Parvin
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)


</script>

<template>
<div id="home">

  <!-- Implemented visual assets and formatted (Colin) -->
  <img src="../assets/main_screen/trading_simp.png" width="391" height="53" color="transparent" alt="Create Account">
  <br>
  <br>
  <img src="../assets/main_screen/welcome_desc.png" width="573" height="150" color="transparent" alt="Create Account">
  <br>
  <br>
  <button type="button" @click="$router.push('login')">
    <img src="../assets/gradient_buttons/create_act_btn_fixed.png" width="139" height="38" color="transparent" alt="Create Account">
  </button>


  
</div>
</template>

<style scoped>
#home {
  text-align: center;
}



a {
  color: #42b983;
}
</style>
