        <!-- Implmented visual assets for login page (Colin) -->
<style scoped>
    @import 'keepcalmfont.css';
</style>

<template>
<!--
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
            <br><img src="../assets/login/dont_have.png" width="486" height="43" color="transparent" alt="Create Account"><br><br>
            <button class="button" v-on:click="flag = true; toggle();"><img src="../assets/gradient_buttons/create_act_btn_fixed.png" width="138" height="38" color="transparent" alt="Create Account"></button>
        </div>
    </div>
-->

    <main class="login">
		<p class="white_header">Welcome To Doubleclick!</p>
        <p class="paragraph">Before we can get started with your new
            trading experience, we need you to provide
            us with your login credentials below.
        </p>
		<section class="forms">

			<form class="login" @submit.prevent="login">
				<h2>Login</h2>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="login_form.email" />
				<br><br>
				<input 
					type="password" 
					placeholder="Password" 
					v-model="login_form.password" />
				<br><br>
				<input type="image" value="login" img src="../src/assets/gradient_buttons/Login.png" width="136" height="38" color="transparent" alt="Login"/>
			</form>

			<p class="white_subheader">Don't have an account?</p>
            <p class="paragraph">Don't worry about it, you can make one by clicking
                the button below
            </p>

			<form class="register" @submit.prevent="register">
				<h2>Register</h2>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="register_form.email" />
				<br><br>
				<input 
					type="password" 
					placeholder="Password" 
					v-model="register_form.password" />
				<br><br>
				<button class="button" value="register"><img src="../assets/gradient_buttons/create_act_btn_fixed.png" width="138" height="38" color="transparent" alt="Create Account"></button>
				<br><br>
			</form>

			

		</section>
	</main>

</template>

<script>
/*
import createAccountComponent from '/src/components/createAccountComponent.vue'
import loginAccountComponent from '/src/components/loginAccountComponent.vue'

/*logic by Loren Parvin*/
/*this page uses the toggle method to dynamically display the 
create account component and login component*/

/*
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
*/
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
	setup () {
		const login_form = ref({});
		const register_form = ref({});
		const store = useStore();

		const login = () => {
			store.dispatch('login', login_form.value);
		}

		const register = () => {
			store.dispatch('register', register_form.value);
		}

		return {
			login_form,
			register_form,
			login,
			register
		}
	}
}
</script>

<style>



</style>
