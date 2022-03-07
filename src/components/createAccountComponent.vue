

<template>
    
    <div>
        <!-- Written by Loren Parvin -->
        <!-- this form is for the create account page -->
        <!-- it has validation for string length and all fields are required -->
        <!-- data currently does not get posted anywhere -->
        
        
        <form action="" method="POST">
            <p class="paragraph_blk"> enter your new account information</p>
            <br><br>
            <br><label for="first_name"><b>First Name</b></label>
          <br><input  id="first_name" maxlength="40" name="first_name" size="20" type="text" required /><br><br>    
        
          <label for="last_name"><b>Last Name</b>
          <br></label><input  id="last_name" maxlength="80" name="last_name" size="20" type="text" required /><br>    
          
          <br><label for="email"><b>Email</b></label><br>
          <input id="email" maxlength="80" name="email" size="20" type="email" required ><br><br>

          <label for="password"><b>Password</b>
          <br></label><input  id="password" maxlength="80" name="password" size="20" type="text" required /><br>

            

          <br> <input type="image" img src="../src/assets/gradient_buttons/create_act_btn_fixed.png" width="136" height="38" color="transparent" alt="Create Account"/> <br>
        </form>

    </div>


</template>

<script>
export default {};
</script>

