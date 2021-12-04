<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)


</script>

<template>
<div id="home">

  <img alt="logo" src="../assets/Doubleclick.PNG" />
    <Welcome msg="Trading Simplified" />
  <h1>{{ msg }}</h1>

  <p style="margin-left:600px; margin-right:600px">
    Doubleclick is an online trading platform that serves trades
    to users based on their preferences and trading styles. Upon
    account creation, you will be asked to fill out a simple
    questionnaire about your trading preferences and tolerances.
    Click the Create Account button below to get started!
  </p>

  <button type="button" @click="count++">Create Account</button>



  
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