<template>

  <div id="login" class="body">
    
    <div class="shadow">

      <div class="imgCont">
        <img src="../assets/beacomlg.png" alt="Beacon logo" />
      </div>

      <h1 class="title"><span class="bold">B</span>eacon</h1>

      <div class="card">

        <form class="mt-1" v-on:submit.prevent="goInside">
          
          <div class="c_txt">
            <i class="lIcon">
                <font-awesome-icon icon="user" viewBox="-150 -50 248 212"/>
            </i>

            <input
              v-model="cred.username"
              class="txt"
              type="text"
              placeholder="Username"
              id="username"
            />
          </div>

          <div class="c_txt">
            <i class="lIcon">
              <font-awesome-icon icon="key" viewBox="-150 -80 288 212"/>
            </i>

            <input
              v-model="cred.password"
              class="txt"
              type="password"
              placeholder="Password"
              id="password"
            />
          </div>

          <div class="dvmsg" v-if="(message == true)">
           
            <span class="spmsg">{{cMessage}}</span>
 
          </div>

          <div class="c_txt">
            <input id="btn" class="c_btn" type="submit" value="Log in"/> <span id="spinc"><font-awesome-icon icon="circle-notch" id="spin" viewBox="165 165 182 182"/></span>
          </div>

        </form>

      </div>

    </div>

    
  </div>

</template>

<script>

import axios from 'axios'

export default {
  name: "loggin",
  title: 'Beacon | Login',

  data () {
    return {
      cred: {
        username: '',
        password: '',
      },
      onGoing: false,
      message: false,
      cMessage: '',
    }
  },

  methods: {

    goInside() {

      this.onGoing = true;
      this.message = false

      document.getElementById("btn").style.display = "none"
      document.getElementById("spinc").style.display = "inline-block"

      axios.post(`/api/login?username=${this.cred.username}&password=${this.cred.password}`)

      .then(response => {

        let rData = response.data;
       
        if(rData.access == true) {

          let uData = rData.user;
          this.$store.commit('setUserState', uData)
          this.$store.commit('initialiseStore')
          this.$router.go('dashboard')

        } else if(rData.access == false && rData.message == 400) {

          document.getElementById("btn").style.display = "inline-block"
          document.getElementById("spinc").style.display = "none"
          this.message = true;
          this.cMessage = 'The password or username is not valid.';

        } else if(rData.access == false && rData.message == 500) {

          document.getElementById("btn").style.display = "inline-block"
          document.getElementById("spinc").style.display = "none"
          this.message = true;
          this.cMessage = 'The server had a crash.';
        }
      })

      .catch(error => {
        document.getElementById("btn").style.display = "inline-block"
        document.getElementById("spinc").style.display = "none"
        console.log(error)
        this.onGoing = false
        this.message = true
        this.cMessage = 'There was a problem while connecting.'

      })

      .finally(() => this.onGoing = false)
    },

  }
};

</script>

<style scoped>
/* styles file in assets */
*{

   font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;

}

.body {
  margin: 0;
  padding: 0;

  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  display: flex;

  justify-content: center;
  align-items: center;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;

  background: linear-gradient(180deg, #000033, #ffffff);
  background-size: 400% 400%;
  background-position-y: 100%;

  -webkit-animation: AnimationName 20s ease infinite;
  -moz-animation: AnimationName 20s ease infinite;
  -o-animation: AnimationName 20s ease infinite;
  animation: AnimationName 20s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 51% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 51% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}
@-o-keyframes AnimationName {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 51% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 51% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}

.imgCont {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0 10px 0;
}

.imgCont img {
  width: 500px;
  height: 250px;
  margin-top: 5px;
  margin-bottom: -15px;
}

/* #00a2ff */

.txt {

  outline: none;
  border: none;
  display: block;
  border: rgb(194, 194, 194) solid 1px;
  border-bottom: #000033 solid 3px;
  width: 170px;
  height: 40px;
  font-size: 20px;
  transition: .6s;
  border-radius: 5px;
  padding: 0 5px 0 60px;
}

.txt:focus {
  background: #ebebeb;
}

.txt:focus { 
  color: #636363;
}

.lIcon {
  position: relative;
  left: +20px;
  top: +3px;
  color: #000;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: 15px;
}



.c_txt {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  margin-top: 15px;
  max-height: 45px;

}

.c_btn {
  outline: none;
  border: none;
  font-weight: bold;
  border: rgb(210, 210, 210) solid 1px;
  border-radius: 5px;
  background: rgba(230, 230, 230, 0.5);
  border-bottom: #000033 solid 2px;
  width: 120px;
  height: 35px;
  font-size: 18px;
  text-align: center;
  transition: 0.5s;
}

.c_btn:hover {
  border-bottom: #00a2ff solid 2px;
  background: rgb(230, 230, 230);
  transition: 0.5s;
}

.shadow {
  box-shadow: 0 0 10px #000;
  width: 410px;
  height: auto;
  
  border-radius: 5px;
  
}

.card {
  background: #fff;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 5px;
}

.title .bold {
  font-weight: bold;
  color: #000;
  text-shadow: 4px 0 #000;
  letter-spacing: 6px;
}

.title {
  font-size: 105px;
  text-align: center;
  font-weight: 100;
  color: rgb(37, 37, 37);
  height: 100px;
  padding-bottom: 10px;
  letter-spacing: 5px;

}


@keyframes rotate360 {

     to { transform: rotate(360deg); }
}

@-webkit-keyframes rotate360 {

     to { transform: rotate(360deg); }
}

#spin { 
  animation: 1.2s rotate360 infinite linear; 
  
}

#spinc {
  padding-top: 10px;
  color: rgb(34, 34, 34);
  display: none;
}


.dvmsg {

background: rgba(199, 54, 54, 0.363);
border-bottom: 4px solid rgb(216, 40, 16);
display: flex;
border-radius: 4px;
justify-content: center;
padding: 5px;
margin-left: 20px;
margin-right: 20px;

}

.spmsg{
  font-weight: bold;

}

@media screen and (max-width: 450px) {

.shadow {

  width: 350px;

}

.title {
  font-size: 95px;
}


}




</style>
