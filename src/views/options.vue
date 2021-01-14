<template>

    <div id="aBody">

        <div class="header">
            <h1>Options</h1>
        </div>

        <div class="pageBody">

            <div id="categories">
                <h2>Inser categories</h2>
                <p>Currently available categories:</p>

                <ul id="catList">

                </ul>

                <input type="text" id="nCatInput" v-model="inpCat">
                <input type="button" value="Add category" id="addCat" v-on:click="addCat(inpCat)">

            </div>

            <div id="createUser">
                <h2>Create a new user</h2>

                <div class="controls">
                    <span>Username</span>
                    <input type="text" id="nUsername" v-model="nUser">

                    <span>Password</span>
                    <input type="password" id="nPassword" v-model="nPassword">

                    <span>Acces level</span>
                    <input type="number" max="100" id="nAccess" v-model="nAccess">

                    <input type="button" value="Create" id="userCreate" v-on:click="newUser(nUser, nPassword, nAccess)">
                </div>
            </div>

            <div id="aControl">
                <h2>Access control</h2>
                <span>Username:</span>
                <input type="text" id="acUser" v-model="userToFind">
                <input type="button" value="Find" id="acFind" v-on:click="findUser(userToFind)">

                <div id="acFindRes">
                    <div class="resData">
                        <h3>Username: {{foundUser}}</h3>
                        <p>Created: {{created}} </p>
                        <p>Acces level: {{access}} </p>
                        <p>Last login: {{lastTime}} form {{lastIP}}</p>
                        <input type="number" placeholder="Access level" id="InputAccess" v-model="newAccess">
                        <input type="button" value="Set" id="setAccess" v-on:click="setAccess(foundUser, newAccess)">
                        <input type="button" value="Delete user" id="delete" v-on:click="deleteUser(foundUser)">
                    </div>
                    <div class="resNoData">
                        <p class="errMessage">{{errMessage}}</p>
                    </div>

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
    name: "options",
    title: "Beacon | Options",

    components: {
        asideMenu
    },
    data () {
        return {
            userToFind: "",
            foundUser: "",
            created: "",
            access: "",
            lastIP: "",
            lastTime: "",
            newAccess: "",
            errMessage: "",
            inpCat: "",
            nUser: "",
            nPassword: "",
            nAccess: ""
        }
       
    },

    mounted() {
        this.loadCat()
    },

    methods: {
        loadCat() {
            axios.get("/api/cat")
            .then(res => {

                let categories = res.data.categories

                let listElement = document.getElementById("catList")
                listElement.innerHTML = "";

                for(let i = 0; i < categories.length; i++) {
                    let listItem = document.createElement("li")
                    listItem.innerText = categories[i]
                    listElement.appendChild(listItem)
                }

            })
            .catch(err =>{
                console.log(err)
            })
        },

        findUser(username) {
            axios.get(`/api/access?user=${username}`)
            .then(res => {
                if(res.data) {

                    this.foundUser = res.data.username;
                    this.created = res.data.created_at;
                    this.access = res.data.permissions;
                    this.lastIP = res.data.last_ip;
                    this.lastTime = res.data.last_log;
                    document.querySelector(".resData").style.display = "block"
                    let messageBox = document.querySelector(".errMessage")
                        messageBox.style.background = "#00ff0056"
                        messageBox.style.borderBottom = "solid 2px #00ff00"
                }
            })
            .catch(() => {
                document.querySelector(".resNoData").style.display = "block"
                document.querySelector(".resData").style.display = "none"
                let messageBox = document.querySelector(".errMessage")
                        messageBox.style.background = "#ff000056"
                        messageBox.style.borderBottom = "solid 2px #ff0000"
                this.errMessage = "Not found"
                setTimeout(() => {
                    document.querySelector(".resNoData").style.display = "none"
                }, 5000)
            })
        },

        setAccess(user, access) {
            axios.post(`/api/access?user=${user}&access=${access}`)
            .then( res => {
                if(res.status == 200) {
                    document.querySelector(".resNoData").style.display = "block"
                    let messageBox = document.querySelector(".errMessage")
                        messageBox.style.background = "#00ff0056"
                        messageBox.style.borderBottom = "solid 2px #00ff00"
                    this.errMessage = "Access level changed"
                    setTimeout(() => {
                        document.querySelector(".resNoData").style.display = "none"
                    }, 5000)
                }
            })
            .catch(() => {
                document.querySelector(".resNoData").style.display = "block"
                let messageBox = document.querySelector(".errMessage")
                        messageBox.style.background = "#ff000056"
                        messageBox.style.borderBottom = "solid 2px #ff0000"
                this.errMessage = "Unable to set new access level"
                setTimeout(() => {
                    document.querySelector(".resNoData").style.display = "none"
                }, 5000)
            })
        },

        addCat(newCat) {
            if(newCat.length > 4) {

                axios.post(`/api/cat?ncat=${newCat}`)
                .then(res => {
                    if(res.status == 200) {
                        this.loadCat()
                    }
                })
            }
        },

        newUser(name, password, access) {
            axios.post(`/api/user?name=${name}&password=${password}&access=${access}`)
            .then(res => {
                if(res.status == 200) {
                    document.getElementById("nUsername").value = "";
                    document.getElementById("nPassword").value = "";
                    document.getElementById("nAccess").value = "";
                }
            })
            .catch(() => {
                    document.getElementById("nUsername").style.color = "#ff0000";
                    document.getElementById("nPassword").style.color = "#ff0000";
                    document.getElementById("nAccess").style.color = "#ff0000";
            })
        },

        deleteUser(user) {
            axios.delete(`/api/user?user=${user}`)
            .then( res => {
                if(res.status == 200) {
                    document.querySelector(".resNoData").style.display = "block"
                    let messageBox = document.querySelector(".errMessage")
                        messageBox.style.background = "#00ff0056"
                        messageBox.style.borderBottom = "solid 2px #00ff00"
                    this.errMessage = "User deleted"
                    setTimeout(() => {
                        document.querySelector(".resNoData").style.display = "none"
                    }, 5000)
                }
            })
            .catch(() => {
                document.querySelector(".resNoData").style.display = "block"
                let messageBox = document.querySelector(".errMessage")
                        messageBox.style.background = "#ff000056"
                        messageBox.style.borderBottom = "solid 2px #ff0000"
                this.errMessage = "Unable to delete the user"
                setTimeout(() => {
                    document.querySelector(".resNoData").style.display = "none"
                }, 5000)
            })
        }
    }

}
</script>

<style scoped>

*{
   font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
    padding: 0;
    margin: 0;
}

#InputAccess {
    display: inline-block;
}

#setAccess {
    margin: 0 0 0 10px;
    padding: 0;
    display: inline-block;
}

#delete {
    margin: 0 0 0 10px;
    padding: 0;
    display: inline-block;
}

#acFindRes .resData {
    display: none;
}

#acFindRes .resNoData {
    padding-left: 150px;
    padding-right: 150px;
    display: none;
}

#acFindRes .resNoData p {
    display: flex;
    background: #ff000056;
    border-bottom: solid 2px #ff0000;
    justify-content: center;
    margin-top: 15px;
    font-weight: bold;
    font-size: 19px;
    padding: 5px;

    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

#acFind {
    padding: 0;
    margin: 0;
    display: inline-block;
}

#aControl h2 {
    margin-bottom: 15px;
}

#aControl span {
    margin-left: 15px;
    display: block;
}

#acUser {
    margin: 5px 15px 0 15px;
    display: inline-block;
}

#createUser .controls {
    padding: 10px 0 0 25px;
    display: flex;
    flex-direction: column;
}

#createUser .controls span {
    padding-left: 10px;
    
}

#nUsername {
    margin: 5px 0 10px 0;
    width: 160px;
}

#nPassword {
    margin: 5px 0 10px 0;
    border-radius: 5px;
    width: 160px;
}

#nAccess {
    margin: 5px 0 10px 0;
}

#userCreate {
    padding: 0;
    margin: 0;
    align-self: center;
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


#aBody {
  padding-left: 25px;
  padding-right: 25px;
 /* background: #222831;*/

}

.pageBody {
    padding-top: 55px;
    display: flex;
    flex-flow: column;
    align-items: center;
}

.pageBody > div {
    display: block;
    border: 1px solid #000;

    margin: 20px 0 20px 0;
    padding: 5px 5px 10px 10px;
    min-width: 900px;
    max-width: 900px;
    border-radius: 5px;
    box-shadow: 0 0 5px #696969;

}

#addCat {
    margin: 5px 0 0 0;
    align-self: center;

}

#categories{
    display: flex;
    flex-direction: column;
    height: auto;
}

#categories p {
    margin: 10px 0 5px 5px;
    font-size: 17px;
}

#nCatInput {
    margin: 10px 0 0 25px;
    width: 180px;
}

#catList {
    margin: 0 0 5px 35px;
    font-weight: bold;
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}


input {
    display: block;
    margin: 10px 0 15px 20px;
    padding: 2px 5px 2px 5px;
    font-size: 16px;

}

input[type=number] {
    -moz-appearance: textfield;
    width: 120px;
    border-radius: 5px;
    border: 1px solid #888;
}


input[type=text] {
    width: 210px;
    border-radius: 5px;
    border: 1px solid #888;
}


input[type=button] {
    width: 130px;
    height: 30px;
    margin: 50px 0 10px 100px;
}



@media screen and (max-width: 950px) {
    .pageBody > div {

        min-width: 800px;

    }

}


@media screen and (max-width: 840px) {
    .pageBody > div {

        min-width: 700px;

    }

}

@media screen and (max-width: 730px) {
    .pageBody > div {

        min-width: 600px;

    }

}

</style>