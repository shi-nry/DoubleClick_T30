<template>
    
    <div>

        <form action="" method="POST">
            <p1><b> enter your new account information</b></p1>
            <br><br>
            <br><label for="first_name"><b>First Name</b></label>
        <br><input  id="first_name" maxlength="40" name="first_name" size="20" type="text" required /><br><br>    
        
        <label for="last_name"><b>Last Name</b>
          <br></label><input  id="last_name" maxlength="80" name="last_name" size="20" type="text" required /><br>    
          
        <br><label for="email"><b>Email</b></label><br>
            <input id="email" maxlength="80" name="email" size="20" type="email" required ><br><br>

            <label for="password"><b>Password</b>
          <br></label><input  id="password" maxlength="80" name="password" size="20" type="text" required /><br>

            

            <br> <input type="submit" name="submit" value = "Create Account"> <br>
        </form>

    </div>


</template>

<script>
export default {};
</script>