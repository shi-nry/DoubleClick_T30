<script>
import { ref } from 'vue'
import VueTradingView from 'vue-trading-view/src/vue-trading-view.vue';

export default {
    name: 'stockChart',
    props: {
        msg: String
    },
    components: {
        VueTradingView,
    }
}
</script>

<template>
  <div class="schart">
      <VueTradingView :options="{
          width: '650',
          height: '200',
          theme: 'light',
          timezone: 'America/Los_Angeles',
          hide_top_toolbar: 'true',
          save_image: 'false',
          style: '2',
          hide_legend: 'true',
      }"/>
  </div>

</template>

<style scoped>
a {
  color: #42b983;
}
</style>
