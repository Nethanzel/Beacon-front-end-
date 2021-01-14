<template>

  <div id="body">

    <div class="header">
      <h1>Account settings</h1>
    </div>


    <div class="prfimgA">

      <img src="/api/profimage" alt="img" class="primgA" />

    </div>

    <div class="usrname">
      <h2>
        {{ this.$store.state.user.username }} 
      </h2>

    </div>


    <div class="setUser dv">

      <div>
        <h3>Set a new password:</h3>
        <span>Insert your new password:</span><input type="password" id="inpPassword">
        <p><span>Last update: </span>Here goes the update date</p>

        <div id="newControls">
          <h4>To change your password first we need: </h4>
          <span>Confirm your new password</span><input type="password" id="inpPasswordConf">
          <br>
          <span>Your current password</span><input type="password" id="inpPasswordCur">
          <input type="button" value="Change password" id="setNewPassword" v-on:click="setPass()">
        </div>
        <p id="passRes"></p>
      </div>
    </div>

    <div class="setProfileImg dv">
      <div>
        <h3>Set a new profile image:</h3>
        <input type="file" accept="image/*" id="file" ref="userimg" v-on:change="imgChanged()">

        <p><span>Last update:</span> {{ this.$store.state.user.profImg.updated.substring(0, 10) + " at " + this.$store.state.user.profImg.updated.substring(11, 16) }}</p>

        <div v-if="this.image" class="btn_upld">
          <input id="setNewimg" type="button" value="Set new image" v-on:click="sendImg()">
        </div>
        <p id="imgRes"></p>
      <!--  <p>Your current user name is <span>{{ this.$store.state.user.username }}</span></p> -->
      </div>

    </div>

    <div class="AccountInfo dv">
      <div>
        <h3>Some info about your account and activity:</h3>
        <p><span>User id:</span> {{ this.$store.state.user._id }}</p>
        <p><span>Username:</span> {{ this.$store.state.user.username }}</p>
        <p><span>Last ip:</span> {{ this.$store.state.user.last_ip }}</p>
        <p><span>Last login date:</span> {{ this.$store.state.user.last_log.substring(0, 10) + " at " + this.$store.state.user.last_log.substring(11, 16) }}</p>
        <p><span>Account creation:</span> {{ this.$store.state.user.created.substring(0, 10) + " at " + this.$store.state.user.created.substring(11, 16) }}</p>
        <br>

        <h4>Log in registry :</h4>

        <div v-for="register of registry" :key="register.date" class="register">
          <p>{{ register.date.substring(0, 10) + " at " + register.date.substring(11, 16) }} from {{ register.ip }}</p>
        </div>

      </div>

    </div>

    <asideMenu />

</div>

</template>

<script>

import asideMenu from '../components/asidemenu.vue'
import axios from 'axios'

export default {
   name: 'dashboard',
  title: 'Beacon | Account settings',

  components: {
    asideMenu
       
  },
    data() {
    return {
      username: this.user,
      loginDate: this.lDate,
      loginIP: this.IP,
      registry: this.$store.state.user.registry,
      image: "",
      imgUploadRes: null,

    }
  },
  methods: {

    imgChanged() {
      this.image = this.$refs.userimg.files[0];
    },

    sendImg() {
      let imgData = new FormData();
      imgData.append('file', this.image)

      axios
      .post("/api/profimage", imgData, {headers:{'Content-Type':'multipart/form-data'}})

      .then((response)=> {
        if(response.status == 200) {
          let imgRes = document.getElementById('imgRes')
          imgRes.style.display = 'block'
          imgRes.style.textAlign = 'center'
          imgRes.style.color = '#fff'
          imgRes.style.background = '#529c52'
          imgRes.style.borderBottom = '3px solid #00aa00'
          imgRes.style.padding = '5px 15px 5px 15px'
          imgRes.innerText = "Your Image was changed"

          setTimeout(() => {
            imgRes.style.display = 'none'
          }, 5000)
        }
      })
      
      .catch(()=> {
          let imgRes = document.getElementById('imgRes')
          imgRes.style.display = 'block'
          imgRes.style.textAlign = 'center'
          imgRes.style.color = '#fff'
          imgRes.style.background = '#b35656'
          imgRes.style.borderBottom = '3px solid #aa0000'
          imgRes.style.padding = '5px 15px 5px 15px'
          imgRes.innerText = "Your Image couldn't be changed"

          setTimeout(() => {
            imgRes.style.display = 'none'
          }, 5000)
      })

    },

    setPass() {
      //Here goes what you need to set new passwords
      let passValue = new FormData

      if (document.getElementById('inpPasswordConf').value != document.getElementById('inpPassword').value) {
          let passRes = document.getElementById('passRes')
          passRes.style.display = 'block'
          passRes.style.textAlign = 'center'
          passRes.style.color = '#fff'
          passRes.style.background = '#b35656'
          passRes.style.borderBottom = '3px solid #aa0000'
          passRes.style.padding = '5px 15px 5px 15px'
          passRes.innerText = "Your passwords doesn't match"

          setTimeout(() => {
            passRes.style.display = 'none'
          }, 5000)

          return null
      } else if (document.getElementById('inpPasswordCur').value.length < 5) {
          let passRes = document.getElementById('passRes')
          passRes.style.display = 'block'
          passRes.style.textAlign = 'center'
          passRes.style.color = '#fff'
          passRes.style.background = '#b35656'
          passRes.style.borderBottom = '3px solid #aa0000'
          passRes.style.padding = '5px 15px 5px 15px'
          passRes.innerText = "Insert your current password"

          setTimeout(() => {
            passRes.style.display = 'none'
          }, 5000)

          let conf = document.getElementById('inpPasswordCur')
          conf.style.boxShadow = '0 0 8px #ff0000'
          conf.style.color = "#ff0000"

          return null
      }

      passValue.append("newPassword", document.getElementById('inpPasswordConf').value)
      passValue.append("currPassword", document.getElementById('inpPasswordCur').value)

      axios.post("/api/pass", passValue)

      .then((res) => {

        if(res.status == 200) {
          let passRes = document.getElementById('passRes')
          passRes.style.display = 'block'
          passRes.style.textAlign = 'center'
          passRes.style.color = '#fff'
          passRes.style.background = '#529c52'
          passRes.style.borderBottom = '3px solid #00aa00'
          passRes.style.padding = '5px 15px 5px 15px'
          passRes.innerText = "Your password was changed"

          setTimeout(() => {
            passRes.style.display = 'none'
          }, 5000)

          axios.get('/api/logout')

          .then(() => {
            localStorage.removeItem('beacon');
            this.$store.commit('logOut')
            this.$router.push('/')
          })

        } else if(res.status == 202) {

          let passRes = document.getElementById('passRes')
          passRes.style.display = 'block'
          passRes.style.textAlign = 'center'
          passRes.style.color = '#fff'
          passRes.style.background = '#b35656'
          passRes.style.borderBottom = '3px solid #aa0000'
          passRes.style.padding = '5px 15px 5px 15px'
          passRes.innerText = "New password is too short"

          setTimeout(() => {
            passRes.style.display = 'none'
          }, 5000)
        }
      })

      .catch(()=> {
          let passRes = document.getElementById('passRes')
          passRes.style.display = 'block'
          passRes.style.textAlign = 'center'
          passRes.style.color = '#fff'
          passRes.style.background = '#b35656'
          passRes.style.borderBottom = '3px solid #aa0000'
          passRes.style.padding = '5px 15px 5px 15px'
          passRes.innerText = "Your password couldn't be changed"

          setTimeout(() => {
            passRes.style.display = 'none'
          }, 5000)
      })
    }
  },

  mounted() {

    document.getElementById('inpPassword').addEventListener("input", function() {
      if (document.getElementById('inpPassword').value.length > 0) {
         document.getElementById('newControls').style.display = "flex"
      } else {
         document.getElementById('newControls').style.display = "none"
      }
    })

    document.getElementById('inpPasswordConf').addEventListener("input", function() {

      let conf = document.getElementById('inpPasswordConf')
      let newP = document.getElementById('inpPassword')

      if (conf.value.length > 0 && newP.value != conf.value) {
        conf.style.boxShadow = '0 0 8px #ff0000'
        conf.style.color = "#ff0000"

      } else {
        conf.style.boxShadow = 'none'
        conf.style.color = "#000000"
      }
    })

    document.getElementById('inpPasswordCur').addEventListener("input", function() {

      let conf = document.getElementById('inpPasswordCur')
      conf.style.boxShadow = 'none'
      conf.style.color = "#000000"

    })

  }




}
</script>


<style scoped>

*{
   font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;

}

.btn_upld {
  margin-top: 0;
  align-self: center;
  display: flex;
  flex-direction: column;
}

#body {

  padding: 55px 25px 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.header {

  width: 100vw;
  height: 45px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #8e8e8e8e;
  box-shadow: 0 2px 5px rgba(116, 115, 115, 0.5);
  background: rgba(136, 136, 136, 0.5);
  padding-left: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
}


.prfimgA {

  display:flex;
  justify-content: center;
  align-content: center;
  

  margin-bottom: 10px;
}


.primgA {
  height: 230px;
  width: 230px;
  border-radius: 100%;
}

.usrname {

  display:flex;
  justify-content: center;
  align-content: center;
  margin-top: 10px;
}


.usrname > h2 {

  font-weight: bold;
  font-size: 45px;

}


.dv {
  margin-bottom: 20px;
  margin-top: 20px;
  border: 1px solid #000;
  border-radius: 10px;

  padding: 10px;
  
  padding-bottom: 20px;

  min-width: 900px;
  max-width: 900px;
  box-shadow: 0 0 5px #696969;
}

h3 {
  margin-bottom: 10px;
}

h4 {
  margin-bottom: 10px;
}

.dv p {
  margin-bottom: 10px;
}

.register {
  padding-left: 20px;
}

span {
  font-weight: bold;
}

p {
margin-left: 15px;
}

input {
margin-left: 15px;
}

#setNewimg {
  color: #000;
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 10px;
  align-self: center;
}

#setNewPassword {
  color: #000;
  width: auto;
  margin-top: 10px;
  align-self: center;
}

input[type=password] {
  border-radius: 5px;
  margin-bottom: 10px;
  max-width: 160px;
}

#file {
  margin-bottom: 10px;
}

#imgRes {
  display: none;
  margin-top: 10px;
  border-radius: 5px;
}

#passRes {
  display: none;
  margin-top: 10px;
  border-radius: 5px;
}

#newControls {
  display: none;
  margin-top: 20px;
  border: #888 solid 1px;
  padding: 10px;
  border-radius: 5px;
  flex-direction: column;

}

#newControls span {
  padding-left: 15px;
  font-weight: normal;
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}


input {
    margin: 10px 0 15px 20px;
    padding: 2px 5px 2px 5px;
    font-size: 16px;

}

input[type=text] {
    width: 210px;
    border-radius: 5px;
    border: 1px solid #888;
}


input[type=file] {
    font-size: 14px;
}

input[type=button] {
    width: 130px;
    height: 30px;
    margin: 50px 0 10px 100px;
}



@media screen and (max-width: 950px) {
    .dv {

        min-width: 800px;

    }

}


@media screen and (max-width: 840px) {
    .dv {

        min-width: 700px;

    }

}

@media screen and (max-width: 730px) {
    .dv {

        min-width: 600px;

    }

}


</style>