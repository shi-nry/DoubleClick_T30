<script>
export default {
  name: 'App',
}

/* all formatting, themeing, and implementation of layout of website in this section done by Colin */
</script>

<template>
  <nav class="navbar navbar-expand-sm bg-light navbar-light">
  <ul class="navbar-nav">
    <li class="nav-item active">
      <img src="../src/assets/top_navigation/logo.png" align="left" alt="logo" width="227" height="27"/>
      <router-link to="/settings"><img src="../src/assets/top_navigation/gear icon.png" style="padding-right: 40px; padding-top: 1px;" align="right" alt="logo" width="20" height="15"/></router-link>
      <router-link to="/"><img src="../src/assets/top_navigation/home.png" style="padding-right: 15px;" align="right" alt="logo" width="52" height="16"/></router-link>
      <router-link to="/test"><img src="../src/assets/top_navigation/test.png" style="padding-right: 15px; padding-top: 1px;" align="right" alt="logo" width="35" height="15"/></router-link>
      <router-link to="/login"><img src="../src/assets/top_navigation/login.png" style="padding-right: 15px;" align="right" width="42" height="20" alt="logo"/></router-link>
      <router-link to="/preference"><img src="../src/assets/top_navigation/account.png" style="padding-right: 15px; padding-top: 1px;" align="right" alt="logo" width="70" height="15"/></router-link>
    </li>
  </ul>
</nav>
  <div id="nav">
    <router-view></router-view> 
  </div>
  
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url(../src/assets/background.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: contain;
}

#home {
  background-color: transparent;
  outline: none;
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
