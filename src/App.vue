<template>

  <div id="app">
      
    
    <router-view />


  </div>

</template>

<script>

//import login from './views/loggin.vue'

//import dash from './views/dashbrd.vue'
import axios from 'axios'

export default {
  name: 'Beacon',
  title: 'Beacon',

  async beforeCreate() {

    try {

      let logState = await JSON.parse(localStorage.getItem('beacon'));

      if (logState.loginState == true) {

        axios.post(`/api/login?username=${logState.user.username}&password=${logState.user.key}`)
        this.$store.commit('setUserState', logState.user)

        this.$router.push('dashboard')
      } 
    } catch (error) {
      console.log("Store not found.")
    }


  },

    watch: {
    
        cMode: function (newVal) {

          if (newVal == true) {
          document.body.style.background = '#fff';
          document.body.style.color = "#000"
          document.body.style.transition = "1s"

          } else {
            document.body.style.background = '#222831';
            document.body.style.color= "#fff"
            document.body.style.transition = "1s"
          }
        }

  },

  computed: {

    cMode() {
      return this.$store.getters.modeGetter
    }
  }
}


</script>

<style>

*{
  
  margin: 0;
  padding: 0;

}

h1, h2 ,h3, h4 {
  cursor: default;
}

</style>


