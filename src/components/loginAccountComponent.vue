

<template>
    
    <div>
        <!-- Written by Loren Parvin -->
        <!-- this form is for account login -->
        <!-- it has validation for string length and all fields are required -->
        <!-- data currently does not get posted anywhere -->
        
        
        <form action="" method="POST">
            <!--<b><img src="../assets/login/login_welcome.png" width="315" height="92" color="transparent" alt="Create Account"></b>-->
            
                
        <br><label for="email"><b>Email</b></label><br>
            <input id="email" maxlength="80" name="email" size="20" type="email" required ><br><br>

            <label for="password"><b>Password</b>
          <br></label><input  id="password" maxlength="80" name="password" size="20" type="text" required /><br>

            

            <br> 
            
            <!--<input type="submit" name="submit" value = "Login"> <br>-->
            <input type="image" img src="../src/assets/gradient_buttons/Login.png" width="136" height="38" color="transparent" alt="Login"/>
        </form>

    </div>


</template>

<style scoped>
#div{
    font-family: lt_amberregular;
}
</style>

<script>
export default {};
</script>
