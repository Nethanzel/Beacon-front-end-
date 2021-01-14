import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vuex from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'

import titleMixin from './mixins/titleMixin'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

//library.add(faPenSquare)
library.add(faUser)
library.add(faKey)
library.add(faCircleNotch)
library.add(faPlus)
library.add(faSearch)

Vue.mixin(titleMixin)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

//

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
//

//route guards
router.beforeEach((to, from, next) => {

  if (to.name !== 'login' && !store.state.loginState) {

    next({ name: 'login' })

  } else if (to.name == 'login' && store.state.loginState)  {

    next({ name: 'dashboard' })

  } else if (to.name == 'options' && store.state.user.permissions != 100){

    next()

  } else {

    next()

  } 

})
//

new Vue({
  store,
  router,
  render: h => h(App)

}).$mount('#app')
