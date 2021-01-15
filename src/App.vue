<template>

  <div id="app">
    <router-view />
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Beacon',
  title: 'Beacon',

  async beforeCreate() {

    try {

      let logState = await JSON.parse(localStorage.getItem('beacon'));

      if (logState.loginState == true) {

        axios.post(`/api/login?username=${logState.user.username}&password=${logState.user.key}`)
        .then(response => {

          let rData = response.data;
        
          if(rData.access == true) {

            let uData = rData.user;
            this.$store.commit('setUserState', uData)
            this.$store.commit('initialiseStore')
            this.$router.go('dashboard')

          } else if(rData.access == false) {
            localStorage.removeItem('beacon');
            this.$store.commit('logOut')
            this.$router.go('/')
          }
        })

      } 
    } catch (error) {
      console.log("")
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


