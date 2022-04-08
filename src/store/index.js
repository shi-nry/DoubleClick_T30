// Nicholas Rinehart
// This code provides the ability to store variables

import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'
import swal from 'sweetalert'

export default createStore({
  state: {
    user: null
  },
  mutations: {

    SET_USER (state, user) {
      state.user = user
    
    },

    CLEAR_USER (state) {
      state.user = null
    }

  },
  actions: {
    async login ({ commit }, details) {
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            swal("User not found")
            break
          case 'auth/wrong-password':
            swal("Wrong password")
            break
          default:
            swal("Something went wrong test1")
        }

        return
      }

      commit('SET_USER', auth.currentUser)
      console.log(auth.currentUser)
      router.push('/')
    },

    async register ({ commit}, details) {
       const { email, password } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            swal("Email already in use")
            break
          case 'auth/invalid-email':
            swal("Invalid email")
            break
          case 'auth/operation-not-allowed':
            swal("Operation not allowed")
            break
          case 'auth/weak-password':
            swal("Weak password")
            break
          default:
            swal("Something went wrong test2")
        }

        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/')
    },

    async logout ({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/login')
    },

    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    }
    
  }
})