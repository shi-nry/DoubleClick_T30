<script>
export default {
  name: 'App',
  data(){
    return {
      //login state 
      state: ''
    }
  }
}
import swal from 'sweetalert';

/* all formatting, themeing, and implementation of layout of website in this section done by Colin */
</script>



<template>

<div>
  <nav class="navbar navbar-expand-sm bg-light navbar-light">
  <img src="../src/assets/top_navigation/logo.png" style="padding-left: 20px;" align="left" alt="logo" width="227" height="27"/>
  <ul class="navbar-nav">
    
    <li class="nav-item active">
      <!--<img src="../src/assets/top_navigation/logo.png" align="left" alt="logo" width="227" height="27"/>-->
      <p class="navbar" style="padding-right: 20px;" align="right">
      <router-link to="/"> home &ensp;</router-link>
      <router-link to="login"> login &ensp;</router-link>
      <!--<router-link to="preferences"> preferences &nbsp</router-link>-->
      <!--<router-link to="/settings">settings &ensp;</router-link>-->
      <router-link to="/contact">contact &ensp;</router-link>
      <router-link to="test">test</router-link>
      </p>
      <!--
      <img src="../src/assets/top_navigation/logo.png" align="left" alt="logo" width="227" height="27"/>
      <router-link to="/settings"><p class="navbar" style="padding-right: 40px;" align="right">settings</p></router-link>
      <router-link to="/"><p class="navbar" style="padding-right: 15px;" align="right" alt="logo">home</p></router-link>
      <router-link to="/test"><img src="../src/assets/top_navigation/test.png" style="padding-right: 15px; padding-top: 1px;" align="right" alt="logo" width="35" height="15"/></router-link>
      <router-link to="/login"><img src="../src/assets/top_navigation/login.png" style="padding-right: 15px;" align="right" width="42" height="20" alt="logo"/></router-link>
      <router-link to="/preference"><img src="../src/assets/top_navigation/account.png" style="padding-right: 15px; padding-top: 1px;" align="right" alt="logo" width="70" height="15"/></router-link>
      -->
    </li>
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
}

a:hover {
    text-decoration: none;
    color: rgb(92, 161, 98);
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
  background-image: url(../src/assets/background.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
