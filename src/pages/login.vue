        <!-- Implmented visual assets for login page (Colin) -->
<style scoped>
    @import 'keepcalmfont.css';
</style>

<template>

<div>

<form class="logout" @submit.prevent="logout">
				<!--<h2>Log Out</h2>-->
				<button class="button_out" value="logout"><img src="../assets/gradient_buttons/logout.png"  color="transparent" alt="Log Out"></button>
			</form>

<div id="box1">

    <main class="login">
	
		<h2 class="white_header">Welcome To Doubleclick!</h2>
        <h3 class="paragraph">Before we can get started with your new
            trading experience, we need you to provide
            us with your login credentials below.
        </h3>



		<section class="forms">
		<!--
				<div id="box2">
			<form class="login" @submit.prevent="login">
				<h2>Login</h2>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="login_form.email" />
				<br>
				<input 
					type="password" 
					placeholder="Password" 
					v-model="login_form.password" />
				<br><br>
				<button class="button" value="login"><img src="../assets/gradient_buttons/Login.png" width="138" height="38" color="transparent" alt="Create Account"></button>
			</form>
			
			<br>
			</div>

		-->

			<!-- old non dynamic register method start:
			<h3 class="white_subheader">Don't have an account?</h3>
            <h3 class="paragraph">Don't worry about it, you can make one by clicking
                the button below
            </h3>
			<div id="box2">
			<form class="register" @submit.prevent="register">
			
				<h2>Register</h2>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="register_form.email" />
				<br>
				<input 
					type="password" 
					placeholder="Password" 
					v-model="register_form.password" />
				<br><br>
				<button class="button" value="register"><img src="../assets/gradient_buttons/create_act_btn_fixed.png" width="138" height="38" color="transparent" alt="Create Account"></button>
				<br><br>
                
			</form>
		
	 </div> 
	old non dynamic method end-->
			
			<!-- <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> -->

			<!--<form class="deletes" @submit.prevent="deletes">
				<h2>Delete Account</h2>
				<button class="button" value="deletes"><img src="../assets/gradient_buttons/log_out_red.png" width="138" height="38" color="transparent" alt="Delete Account"></button>
			</form>-->

		</section>

	</main>

	
<!-- new dynamic register from older version is below-->

<div>
        
        

	<keep-alive>
		<component v-bind:is="component" />
	</keep-alive>

	<div v-if="flag===false">
		<br><img src="../assets/login/dont_have.png" width="486" height="43" color="transparent" alt="Create Account"><br><br>
		<button class="button" v-on:click="flag = true; toggle();"><img src="../assets/gradient_buttons/create_act_btn_fixed.png" width="136" height="38" color="transparent" alt="Create Account"></button>
	</div>



</div> 
        

</div>

<!-- end new dynamic register-->
</div>

</template>

<script>

import { ref } from 'vue'
import { useStore } from 'vuex'
import { getAuth, signOut, deleteUser} from "firebase/auth";
import createAccountComponent from '/src/components/createAccountComponent.vue'
import loginAccountComponent from '/src/components/loginAccountComponent.vue'

export default {

	//test componenent

	components: {
    createAccountComponent,
    loginAccountComponent
  },
  props: {
      flag: Boolean
  },
  data (){
      return {
          component: "loginAccountComponent",
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
  },

  // test component

	setup () {
		const login_form = ref({});
		//const register_form = ref({});
		const store = useStore();

		const login = () => {
			console.log("signed in")
			store.dispatch('login', login_form.value);
		}

		//const register = () => {
			//store.dispatch('register', register_form.value);
			//test
			//const auth = getAuth();
			//console.log(auth.currentUser)
			
            
           
			//test
		//}
       
		const logout = () => {
			const auth = getAuth();
			console.log("signed out");
			signOut(auth).then(() => {}).catch((error) => {});
			swal('Logged Out Successfully!')
		}

		const deletes = () => {
			const auth = getAuth();
			const user = auth.currentUser
			console.log("account deleted");
			deleteUser(user).then(() => {}).catch((error) => {});
		}

		return {
			login_form,
			//register_form,
			login,
			//register,
			logout,
			deletes
		}
	}
}
</script>

<style>



</style>
