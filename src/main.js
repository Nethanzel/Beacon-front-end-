import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

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

new Vue({
  store,
  router,
  render: h => h(App)

}).$mount('#app')
