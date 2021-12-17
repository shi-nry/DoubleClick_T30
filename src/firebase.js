/** This file is a work in progress for handling storage of authentication for 
 firebase database server, couldn't get firebase to work with our project due
 to wierd dependency issues after running npm install, npm install vue-router,
 npm install firebase, causing a "[plugin:vite:import-analysis] Failed to resolve entry for package "firebase". The package may have incorrect main/module/exports specified in its package.json: Missing "." export in "firebase" package" error 
 - Worked on by Eugene Eom **/


//1. firebase config and startup (lines 9-24) to be added to main.js, code taken from firebase project, where you create a firebase project, link an app to it and copy paste the config and initialization into main.js
//in line 4 before "createApp(App).use(router).mount('#app')" at line 6"
import firebase from 'firebase'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWDT5wUs1t-NAOcR3fTbvoTeDbwwb62X0",
  authDomain: "doubleclickt30.firebaseapp.com",
  projectId: "doubleclickt30",
  storageBucket: "doubleclickt30.appspot.com",
  messagingSenderId: "1036356833168",
  appId: "1:1036356833168:web:3769e4492d0c41782cad15",
  measurementId: "G-YKVXPSBY1R"
};
// Initialize Firebase
firebase.initalizeApp(firebaseConfig);


//2. Authentication code to be added in createAccountComponent.vue
//requires that the input type/fields/id (first_name, last_name, email, password) are also
//v-model = 'first_name', v-model = 'last_name, v-model = 'email', v-model = 'password' attached inside of it to connect inputs into javascript data
//where 'register' represents a v-on:click button (line 27: input type = "submit" needs to be a button that triggers on click) that submits user entered info
<script>
import firebase from 'firebase'
export default {
  name: 'register',
  data: function() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            // console.log(user);
            alert(`Account Created for ${user.email}`);
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
</script>

//3. Authentication code to be added in loginAccountComponent.vue
//requires that the input type/fields/id (email, password) are also v-model= 'email', v-model= 'password' attached inside of it
//where 'login' represents a v-on:click button (line 22: input type = "submit" needs to be a button that triggers on click) that submits user entered info
<script>
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
</script>

//4. Router changes in App.vue navbar, check if user is logged in, then remove "login" button and replace it with a "logout" button
<li v-if="!isLoggedIn"><router-link to="/login"><img src="../src/assets/top_navigation/login.png" style="padding-right: 15px;" align="right" width="42" height="20" alt="logo"/></router-link></li>
 <li v-if="isLoggedIn"><button v-on:click="logout" style="padding-right: 15px;" align="right" width="42" height="20" alt="logo"/></router-link>>Logout</button></li>

import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};

