        <!-- Implmented visual assets for login page (Colin) -->
<style scoped>
    @import 'keepcalmfont.css';
</style>

<template>
    <div>
        
        <p class="white_header">Welcome To Doubleclick!</p>
        <p class="paragraph">Before we can get started with your new
            trading experience, we need you to provide
            us with your login credentials below.
        </p>        

        <keep-alive>
            <component v-bind:is="component" />
        </keep-alive>
        <div v-if="flag===false">
            <br>
            <p class="white_subheader">Don't have an account?</p>
            <p class="paragraph">Don't worry about it, you can make one by clicking
                the button below
            </p>
            <br>
            <!--<br><img src="../assets/login/dont_have.png" width="486" height="43" color="transparent" alt="Create Account"><br><br>-->
            <button class="button" v-on:click="flag = true; toggle();"><img src="../assets/gradient_buttons/create_act_btn_fixed.png" width="136" height="38" color="transparent" alt="Create Account"></button>
        </div>
    
    </div>
</template>

<script>
import createAccountComponent from '/src/components/createAccountComponent.vue'
import loginAccountComponent from '/src/components/loginAccountComponent.vue'

/*logic by Loren Parvin*/
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
