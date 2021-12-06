<template>
    <div>
        
        <keep-alive>
            <component v-bind:is="component" />
        </keep-alive>

        <div v-if="flag===false">
            <br><p> or </p><br>
            <button v-on:click="flag = true; toggle();">Create New Account</button>
        </div>
    
    </div>
</template>

<script>
import createAccountComponent from '/src/components/createAccountComponent.vue'
import loginAccountComponent from '/src/components/loginAccountComponent.vue'



export default {
  components: {
    createAccountComponent,
    loginAccountComponent
  },
  props: {
      flag: Boolean
  },
  data (){
      return {
          component: "loginAccountComponent"
      }
  },
  methods: {
      toggle(){
          if(this.component === createAccountComponent){
              this.component = loginAccountComponent;
              flag=true;
          } else {
              this.component = createAccountComponent;
              flag=true;
          }
      }
  }
}

</script>

<style>



</style>