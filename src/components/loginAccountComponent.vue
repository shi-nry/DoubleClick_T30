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
//make the submit button at line 27 be a v-on click like
//<button v-on:click="register">Register</button>
/*
import firebase from 'firebase'
export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${user.email}`);
            this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
*/

export default {

};
</script>
