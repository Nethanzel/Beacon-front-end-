<template>

  <div class="aside" id="aside">

      <div class="profile">

        <div class="prfimg">
          <div class="imgbg">
            <img src="/api/profimage" alt="img" class="primg" />
          </div>
        </div>

        <div class="p_username">
          <p>
            {{ this.$store.state.user.username }}
          </p>

        </div>

        <div class="details">

          <p class="p_details"><span>Last log in:</span> {{ formatedLogDate }} </p>

          <p class="p_details"><span>From:</span> {{ this.$store.state.user.last_ip }}</p>

        </div>

        <div class="optionDis">

          <span class="opTitle">Theme</span>

          <div class="switch" id="switch">
            <span id="swtButtom" v-on:click="setTheme()"></span>
          </div>
        </div>
      </div>


      <div id="nav">

        <router-link to="/dashboard" class="option">
          <div>
            <span>Dashboard</span>
          </div>
        </router-link>

        <router-link to="/actions" class="option">
          <div>
            <span>Actions</span>
          </div>
        </router-link>

        <router-link to="/options" class="option" v-if="this.$store.state.user.permissions == 100">
          <div>
            <span>Admin's panel</span>
          </div>
        </router-link>

        <router-link to="/account" class="option">
          <div>
            <span>Account</span>
          </div>
        </router-link>

        <router-link to="/about" class="option">
          <div>
            <span>About</span>
          </div>
        </router-link>

        <div class="option" v-on:click="logout">
           <span>Log out</span>
        </div>

      </div>
      <router-view />

  </div>

</template>



<script>
import axios from 'axios'

export default {
  name: "asideMenu",

  methods: {
    logout() {
      axios.get('/api/logout')

      .then(() => {
        localStorage.removeItem('beacon');
        this.$store.commit('logOut')
        this.$router.push('/')
      })

      .catch(() => {
        localStorage.removeItem('beacon');
        this.$store.commit('logOut')
        this.$router.push('/')

      })
    },

    setTheme() {

      if (this.$store.getters.modeGetter == false || undefined) {

        axios.get('/api/theme/true')

        .then( () => {
          let swtch = document.getElementById('switch')
          swtch.style.justifyContent = 'flex-end'
          swtch.style.background ="#222831"
          document.getElementById('swtButtom').style.background ="#fff"
          this.$store.commit('modeSetter')
        })

        .catch(error => {
          console.log(error)
        })

      } else {
        axios.get('/api/theme/false')

        .then( () => {
          let swtch = document.getElementById('switch')
          swtch.style.justifyContent = 'flex-start'
          swtch.style.background ="#fff"
          document.getElementById('swtButtom').style.background ="#222831"
          this.$store.commit('modeSetter')
        })

        .catch(error => {
          console.log(error)
        })

      }

    },


  },

  created() {

  setTimeout(() => {

      document.getElementById('aside').style.color="#fff"

      if (this.$store.getters.modeGetter == false || undefined) {
          let swtch = document.getElementById('switch')
          swtch.style.justifyContent = 'flex-start'
          swtch.style.background ="#fff"
          document.getElementById('swtButtom').style.background ="#222831"

      } else {
          let swtch = document.getElementById('switch')
          swtch.style.justifyContent = 'flex-end'
          swtch.style.background ="#222831"
          document.getElementById('swtButtom').style.background ="#fff"

      }
    }, 500)
  },

  computed: {
    formatedLogDate() {
      return this.$store.state.user.last_log.substring(0, 10) + " at " + this.$store.state.user.last_log.substring(11, 16)
    }
  }
};

</script>


<style>

* {

  padding: 0;
  margin: 0;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}


p {
  cursor: default;
}

.aside {

  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: unset;
  flex-direction: column;
  background: #00003444;
  height: 100vh;
  width: 10px;
  transition: .5s;

}

.aside div > * {

  visibility: hidden;
  opacity: 0;
  transition: 0.5s;
}


/* hovers */
.aside:hover {
  
 /* width: 20vw;*/
  width: 270px;
  
  transition: 0.3s;
  box-shadow: 5px 0 10px rgba(116, 115, 115, 0.5);

  background: linear-gradient(181deg, #000034, #adadad);
  background-size: 400% 400%;

  background: linear-gradient(92deg, #000034, #adadad);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 24s ease infinite;
  -moz-animation: AnimationName 24s ease infinite;
  -o-animation: AnimationName 24s ease infinite;
  animation: AnimationName 24s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 49%;
  }
  50% {
    background-position: 100% 52%;
  }
  100% {
    background-position: 0% 49%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 49%;
  }
  50% {
    background-position: 100% 52%;
  }
  100% {
    background-position: 0% 49%;
  }
}
@-o-keyframes AnimationName {
  0% {
    background-position: 0% 49%;
  }
  50% {
    background-position: 100% 52%;
  }
  100% {
    background-position: 0% 49%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 0% 49%;
  }
  50% {
    background-position: 100% 52%;
  }
  100% {
    background-position: 0% 49%;
  }
}

.aside:hover div > * {


  visibility: visible;
  opacity: 1;
  transition: opacity 0.3s, visibility 0.3s;

 /* visibility: visible;
  transition: 0.3s;

  -webkit-animation: fadeInFromNone 0.5s ease-out;
  -moz-animation: fadeInFromNone 0.5s ease-out;
  -o-animation: fadeInFromNone 0.5s ease-out;
  animation: fadeInFromNone 0.5s ease-out;*/
}


/* Menu option style */

.aside .option {
  cursor: pointer;
  display: flex;
  width: 14.5wh;
  color: #fff;
  font-size: 18px;
  height: 40px;
  align-items: center;
  margin-bottom: 5px;
  text-decoration: none;
}

.aside .option span {
  margin-left: 10px;
  text-shadow: 0 0 3px #000;
}

.aside .option:hover {
  background: rgba(255, 255, 255, 0.6);
  border-left: #fff 5px solid;
  color: #fff;
  transition: none;
}

.aside .option:hover span {
  margin-left: 5px;
  transition: none;
}

.aside .optionDis {
  cursor: default;
  display: flex;
  width: 14.5wh;
  color: #fff;
  font-size: 18px;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 15px;
  text-decoration: none;

}

.aside .optionDis .opTitle {
  margin-left: 20px;
  text-shadow: 0 0 3px #000;
}

.aside .optionDis .switch {

  margin-left: 20px;
  width: 30px;
  height: 15px;

  background: #fff;
  border-radius: 20%;
  border: 1px solid #000;

  display: flex;
  justify-content: flex-start;

}

.aside .optionDis .switch span {
  background: #222831;
  border-radius: 100%;
  width: 15px;

}

/* aside profile style*/
.profile {

  margin-top: 5px;
  
}

.aside .profile .prfimg {
  display: flex;
  justify-content: center;
  margin-bottom: 2px;
}

.imgbg {
  background: #fff;
  width: 100px;
  height: 100px;
  border-radius: 100%;
}

.primg {
  height: 100px;
  width: 100px;
  border-radius: 100%;
}

.p_username {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.p_username p {
  font-weight: bold;
  font-size: 25px;
  text-shadow: 0 0 3px #000;
}

.details {
 
  margin-left: 5px;
}

.p_details {
  text-shadow: 0 0 3px #000;
  margin-bottom: 5px;
  width: 270px;
}


.p_details span {
 
  font-size: 18px;
  font-weight: bold;
  
}

/* menu selected option */

.aside .router-link-exact-active/*.current*/ {
  background: rgba(255, 255, 255, 0.35);
  /*color: #000034;*/
  border-left: #0066ff 5px solid;
}

.aside .router-link-exact-active/*.current*/ span {
  margin-left: 5px;
}


#nav {
  margin-top: 15px;

}

</style>
