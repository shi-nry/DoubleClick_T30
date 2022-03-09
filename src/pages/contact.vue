<style scoped>
    @import 'keepcalmfont.css';
</style>

<template>

<html>
    <head>
        <meta charset="utf-8">
        <title>Font Test</title>
    </head>
    <body>
        <p class="white_header">Questions or comments?</p>
        <p class="paragraph">Fill in the form below with your name,
            your email, and a message to our devs on how we can help
            you or improve our service!
        </p>

<form action="https://formsubmit.co/comstockcolin@gmail.com" method="POST">
     <input type="hidden" name="_subject" value="Doubleclick User Comment">
     <label for="name"><b>Name</b></label><br>
     <input type="text" name="name" placeholder="Write your name in here!" required>
     <br>
     <br><label for="name"><b>Email</b></label><br>
     <input type="email" name="email" placeholder="Write your email in here!" required>
     <br>
     <br><label for="name"><b>Message</b></label><br>
     <input type="text" name="message" placeholder="Write your message here!" required>
     <br><br>
     <button class="button" type="submit"><img src="../assets/gradient_buttons/Submit.png" width="138" height="38" color="transparent" alt="Create Account"></button>
     <br><br>
     <input type="hidden" name="_next" value="http://localhost:3000/thanks">
</form>

        


        <!--<form action="mailto:comstockcolin@gmail.com.com"


method="POST"


enctype="multipart/form-data"


name="EmailForm">


Name:<br>


<input type="text" size="19" name="ContactName"><br><br>


Message:<br> <textarea name="ContactCommentt" rows="6" cols="20">


</textarea><br><br> <input type="submit" value="Submit"> </form>-->
    </body>
</html>


</template>
