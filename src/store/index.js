import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
  
      user: {},
      loginState: false,
      chartsData: undefined
    },
  
    mutations: {
  
      initialiseStore(state) {
  
        if(localStorage.getItem('beacon')) {
          this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('beacon'))))
        }
  
      },
  
      setUserState (state, payload) {
        state.user = payload
        state.loginState = true
  
      },
  
      logOut (state) {
        state.user = {}
        state.loginState = false
      },
  
      modeSetter: (state) => {
        state.user.theme =!state.user.theme
      },
  
      dashGetter (state) {
  
        axios.get("/api/dashboard")
  
        .then((response) => {
          state.chartsData = response.data
        })
      }
    },
  
    getters: {
  
      modeGetter: (state) => {
        return state.user.theme
      },
  
      chartsGetter: (state) => {
        return state.chartsData
      }
  
  
    }
  
})


store.subscribe((mutation, state) => {

  if(!state.loginState == false)  {
    // Store the state object as a JSON string
    localStorage.setItem('beacon', JSON.stringify(state));
  } else {
    localStorage.removeItem('beacon');

  }

});

export default store