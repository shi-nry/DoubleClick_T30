        <!-- Implmented visual assets for login page (Colin) -->
<style scoped>
    @import 'keepcalmfont.css';
</style>

<template>

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
			
				<button class="button" value="logout"><img src="../assets/gradient_buttons/log_out_red.png" width="138" height="38" color="transparent" alt="Log Out"></button>
			

		</section>
	</main>

</template>

<script>

import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
	setup () {
		const login_form = ref({});
		const register_form = ref({});
		const store = useStore();

		const login = () => {
			console.log("signed in")
			store.dispatch('login', login_form.value);
		}

		const register = () => {
			store.dispatch('register', register_form.value);
		}
        const logout = () => {
			console.log("signed out")
			store.dispatch('logout');
		}
		return {
			login_form,
			register_form,
			login,
			register,
			logout
		}
	}
}
</script>

<style>



</style>
