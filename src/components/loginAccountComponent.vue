<template>
    
    <div>

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
export default {};
</script>