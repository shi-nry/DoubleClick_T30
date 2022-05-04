

<template>
    
    <div>
        <!-- Written by Loren Parvin -->
        <!-- this form is for account login -->
        <!-- it has validation for string length and all fields are required -->
        <!-- data currently does not get posted anywhere -->
        <!--<b><img src="../assets/login/login_welcome.png" width="315" height="92" color="transparent" alt="Create Account"></b>-->
        <!--<input type="submit" name="submit" value = "Login"> <br>-->
       <!--  old method below 
        <form action="" method="POST">
            
            
                
        <br><label for="email"><b>Email</b></label><br>
            <input id="email" maxlength="80" name="email" size="20" type="email" required ><br><br>

            <label for="password"><b>Password</b>
          <br></label><input  id="password" maxlength="80" name="password" size="20" type="text" required /><br>

            

            <br> 
            
            
            <button class="button" type="submit"><img src="../assets/gradient_buttons/login_btn.png" width="138" height="38" color="transparent" alt="Create Account"></button>
        </form>
     -->


     
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
        <button class="button" type="submit"><img src="../assets/gradient_buttons/Login.png" width="138" height="38" border="0" color="transparent" alt="Create Account"></button>
        <br><br>
    </form>
    </div>
    
    <br>





    </div>


</template>

<style scoped>
@import '/src/pages/keepcalmfont.css';
</style>

<script>
//export default {

import { ref } from 'vue'
import { useStore } from 'vuex'
import { getAuth} from "firebase/auth";
export default {
	setup () {
		const login_form = ref({});
		const store = useStore();

		const login = () => {
			store.dispatch('login', login_form.value);
            //test
			//const auth = getAuth();
			console.log("signed in")
			
            
           
			//test
		}

		return {
			login_form,
			login
		}
	}
}



//};
</script>
