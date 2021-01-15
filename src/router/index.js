import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'login',
    component: () => import( '../views/loggin.vue'),
    meta: {
      requiresVisitor: true
    }
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import( '../views/dashbrd.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/actions',
    name: 'actions',
    component: () => import( '../views/actions.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/options',
    name: 'options',
    component: () => import( '../views/options.vue'),
    meta: {
      requiresAuth: true
    }
  },


 {
    path: '/account',
    name: 'account',
    component: () => import( '../views/account.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/about.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

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

export default router
