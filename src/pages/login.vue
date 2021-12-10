<template>
    <div>
        
        

        <keep-alive>
            <component v-bind:is="component" />
        </keep-alive>
        <!-- Implmented visual assets for login page (Colin) -->
        <div v-if="flag===false">
            <br><img src="../assets/login/dont_have.png" width="486" height="43" color="transparent" alt="Create Account"><br><br>
            <button v-on:click="flag = true; toggle();"><img src="../assets/gradient_buttons/create_act_btn_fixed.png" width="136" height="38" color="transparent" alt="Create Account"></button>
        </div>
    
    </div>
</template>

<script>
import createAccountComponent from '/src/components/createAccountComponent.vue'
import loginAccountComponent from '/src/components/loginAccountComponent.vue'

/*page creation and logic by Loren Parvin*/
/*this page uses the toggle method to dynamically display the 
create account component and login component*/


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
