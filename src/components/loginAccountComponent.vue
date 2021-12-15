<template>
    
    <div>
        <!-- Written by Loren Parvin -->
        <!-- this form is for account login -->
        <!-- it has validation for string length and all fields are required -->
        <!-- data currently does not get posted anywhere -->
        
        
        <form action="" method="POST">
            <b><img src="../assets/login/login_welcome.png" width="315" height="92" color="transparent" alt="Create Account"></b>
            <br><br>
                
        <br><label for="email"><b>Email</b></label><br>
            <input id="email" maxlength="80" name="email" size="20" type="email" required ><br><br>

            <label for="password"><b>Password</b>
          <br></label><input  id="password" maxlength="80" name="password" size="20" type="text" required /><br>

            

            <br> <input type="submit" name="submit" value = "Login"> <br>
        </form>

    </div>


</template>



<script>
/** This bit is to take the user inputted data and attempt to login to firebase's account (assuming the account already exists) 
 Worked on by Eugene Eom **/
import{ref} from 'vue'
import firebase from 'firebase'

export default {
    setup(){
    const email = ref("")
    const password = ref("")

    const login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(data => console.log(data))
        .catch(err => alert(err.message));
    }
  }
};
</script>
