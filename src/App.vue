<script>
import { onBeforeMount } from 'vue'
import { loadScript } from "vue-plugin-load-script";
import { getAuth } from "firebase/auth";
//import navBar from '/src/components/navBar.vue'
//import { auth } from '/src/firebase/index.js'
loadScript("https://cdn.jsdelivr.net/npm/chart.js")

//console.log(auth.currentUser)

//test
  /*
module.exports = {
  data: function() {
       return {
          testno: 'signed in',
          testyes: 'signed out'
        }
    }
}
*/
  //test
  //window.onload = function() {
  //created();
//};
//test
//test


//test
export default {
  name: 'App',
  data(){
    return {
       userId: '',
       loggedin: '',

    }
  },
  
  methods:
  {
   
  },
  created(){

        const auth = getAuth();
        try{
            this.userId = auth.currentUser.uid;
            this.loggedin = true;
            console.log('logged in with ' + this.userId);
        }catch(error){
            this.userId = '';
            this.loggedin = false;
            console.log('not logged in');
        }
        
        

    },
}
//import swal from 'sweetalert';
/* all formatting, themeing, and implementation of layout of website in this section done by Colin */
</script>



<template id="background_fix">

<div class="background_fix">
  <nav class="navbar navbar-expand-sm bg-light navbar-light">
  <img src="../src/assets/top_navigation/logo.png" style="padding-left: 20px;" align="left" alt="logo" width="227" height="27"/>
  <ul class="navbar-nav">
    <div >
      <li class="nav-item active">
        <!--<img src="../src/assets/top_navigation/logo.png" align="left" alt="logo" width="227" height="27"/>-->
        <p class="navbar" style="padding-right: 20px;" align="right">
        <router-link to="/"> home &ensp;</router-link>
        <router-link to="/login"> account &ensp;</router-link> <!-- make login a variable --> 
        <!--<router-link to="/settings">settings &ensp;</router-link>-->
        <router-link to="/preference"> preferences &ensp;</router-link>
        <router-link to="/position"> positions &ensp;</router-link>
        <router-link to="/trade"> trade &ensp;</router-link>
        <router-link to="/history"> performance &ensp;</router-link>
        <router-link to="/contact">contact &ensp;</router-link>
        <!--<router-link to="/test2">stock suggestion &ensp;</router-link>-->
        <!--<router-link to="/test">test</router-link>
        <router-link to="/trade_redesign">trade_new</router-link>-->
              
        <router-link to="/settings"><p class="navbar" style="padding-right: 40px;" align="right">settings</p></router-link>
        <router-link to="/"><p class="navbar" style="padding-right: 15px;" align="right" alt="logo">home</p></router-link>
        <router-link to="/test"><img src="../src/assets/top_navigation/test.png" style="padding-right: 15px; padding-top: 1px;" align="right" alt="logo" width="35" height="15"/></router-link>
        <router-link to="/login"><img src="../src/assets/top_navigation/login.png" style="padding-right: 15px;" align="right" width="42" height="20" alt="logo"/></router-link>
        <router-link to="/preference"><img src="../src/assets/top_navigation/account.png" style="padding-right: 15px; padding-top: 1px;" align="right" alt="logo" width="70" height="15"/></router-link>
        </p>
      </li>
    </div>
    
   <!--
    <div v-else-if="loggedin===false">
      <li class="nav-item active">
        <p class="navbar" style="padding-right: 20px;" align="right">
        <router-link to="/"> home &ensp;</router-link>
        <router-link to="/login"> login &ensp;</router-link>
        <router-link to="/contact">contact &ensp;</router-link>
        <router-link to="test">test</router-link>
        </p>
      </li>
    </div>
 -->
  </ul>
</nav>
  <div id="nav">
    <router-view></router-view> 
  </div>
</div>  
</template>

<style>

nav ul {list-style: none;}

a:visited {
    text-decoration: none;
    color: black;
}

a:link {
    text-decoration: none;
    color: black;
    font-family: keep_calm_medregular;
    z-index: 1000;
}

a:hover {
    text-decoration: none;
    color: rgb(73, 167, 81);
    transition: all 150ms cubic-bezier(.17,.67,.83,.67);
    text-shadow: 0 0 4px rgb(196, 196, 196);
    
}



#app {
  font-family: lt_amberregular, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(0, 0, 0);
  background-image: url(../src/assets/background.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: contain;
  min-height: 100%;

}

#li{
  text-decoration: none;
    color: black;
}

#login{
  font-family: keep_calm_medregular;
}

#home {
  background-color: transparent;
  outline: none;
  
}

#font_test {
  font-family: keep_calm_medregular;
}

#nav {
  padding: 30px;
  background: rgb(56,235,186);
  background: linear-gradient(-130deg, rgba(56,235,186,1) 0%, rgba(111,177,210,1) 92%);
  background-position: bottom;
  background-repeat: repeat;
  background-size: fill;
  position: absolute;
  top: 60px;
  right: 0px;
  bottom: 0px;
  left: 0px;


}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
