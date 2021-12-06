<script>
export default {
  name: 'App',
}


</script>

<template>
  <nav class="navbar navbar-expand-sm bg-light navbar-light">
  <ul class="navbar-nav">
    <img src="../src/assets/top_navigation/logo.png" align="left" alt="logo" width="227" height="27"/>
    <li class="nav-item active">
      <router-link to="/">Home</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/login">Login</router-link>
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
