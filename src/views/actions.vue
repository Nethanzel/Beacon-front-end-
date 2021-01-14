<template>
  <div class="actContnr">

      <div class="actHeader">
          <h1>Actions</h1> 
      </div>

        <p class="act"> 
            <span v-on:click="insertFace()" class="selAction insert"><font-awesome-icon icon="plus" /> Insert</span> 
            <span v-on:click="searchFace()" class="iconlf search"><font-awesome-icon icon="search" /> Search</span>
        </p>

        <div class="sOptions">
            <h2>Search filter options</h2>

            <section>
                <div id="sbDateDiv">
                    <p>By date</p>
                    <input type="date" id="sbDate">
                </div>

                <div id="sbYearDiv">
                    <p>By year</p>
                    <input type="number" id="sbYear">
                </div>

                <div id="sbMonthDiv">
                    <p>By month</p>
                    <input type="number" id="sbMonth">
                </div>

                <div id="sbRNCDiv">
                    <p>By RNC</p>
                    <input type="number" id="sbRNC">
                </div>

                <div id="sbNCFDiv">
                    <p>By NCF</p>
                    <input type="text" id="sbNCF">
                </div>
            </section>

            <section>
                <div id="sbConsDiv">
                    <p>Final consumer</p>
                    <input type="radio" name="sbCons" id="sbConsYes" value="Yes">
                    <label for="sbConsYes"> Yes</label>

                    <input type="radio" name="sbCons" id="sbConsNo" value="No">
                    <label for="sbConsNo"> No</label>

                </div>

                <div id="sbNCatDiv">
                    <p>By category</p>
                    <select id="sbCat">
                    </select>
                </div>
            </section>

            <section>
                <button v-on:click="runQuery()"><font-awesome-icon icon="search" /> Run query</button>
            </section>

            <section id="Qresult"></section>
        </div>

        <div class="actBody" id="queryResult" v-html="this.insertTemplate">

        </div>


    <asideMenu />
  </div>
</template>


<script>

import asideMenu from '../components/asidemenu.vue'
import axios from 'axios'

export default {
    name: "actions",
    title: "Beacon | Actions",

    components: {
        asideMenu
    },

    data() {
        return{
            action: 0,
            img: null,
            insertTemplate: `
            <div class="billInfo">

                <h2>Billing info</h2>

                <input type="number" id="rnc" placeholder="Vendor RNC">
                <input type="text" id="rsocial" placeholder="Vendor name">
                <input type="text" id="ncf" placeholder="Bill NCF">
                <input type="date" id="fecha" placeholder="Purchase date">
                <input type="number" id="tgrabado" placeholder="Total">
                <input type="number" id="itbis" placeholder="Taxes">
                <input type="number" id="proplegal" placeholder="Legal tip">
                <input type="number" id="texcento" placeholder="Taxes free total">
                <input type="number" id="tfacturado" placeholder="Total paid">

            </div>

            <div class="borderdv">

                <div class="billMeta">
                    <h2>Billing meta</h2>

                    <input type="file" accept="image/*" id="bImg">

                    <select id="category">

                    </select>

                    <div id="radioC">
                        <p>¿The NFC is for final consumer?</p>

                        <input type="radio" name="nfc" id="consumoyes" value="Yes">
                        <label for="consumo_yes">Yes</label>

                        <input type="radio" name="nfc" id="consumono" value="No">
                        <label for="consumo_no">No</label>
                    </div>

                    <input type="button" value="Save" id="sendData">

                    <div id="result"></div>
                </div>

                <div class="billImg">
                    <img id="shImg"></img>
                </div>

            </div>
            `
            ,

        }

    },

    computed: {
        cMode() {
            return this.$store.getters.modeGetter
        },

        cAction() {
            return this.action
        },
    },

    watch: {

        cMode: function (newVal) {

        if (newVal) {
            document.querySelector(".borderdv").classList.add('lightMode')
            document.querySelector(".billInfo").classList.add('lightMode')
            document.querySelector(".sOptions").classList.add('lightMode')

            document.querySelector(".borderdv").classList.remove('darkMode')
            document.querySelector(".billInfo").classList.remove('darkMode')
            document.querySelector(".sOptions").classList.remove('darkMode')

        } else {
            document.querySelector(".borderdv").classList.remove('lightMode')
            document.querySelector(".billInfo").classList.remove('lightMode')
            document.querySelector(".sOptions").classList.remove('lightMode')

            document.querySelector(".borderdv").classList.add('darkMode')
            document.querySelector(".billInfo").classList.add('darkMode')
            document.querySelector(".sOptions").classList.add('darkMode')
        }
    },

    cAction : function (newValue) {
        
        if(newValue == 0) {
            document.querySelector(".sOptions").style.display = "none"

            let insDiv = document.querySelector(".actBody")
            document.querySelector(".insert").classList.add("selAction")
            document.querySelector(".search").classList.remove("selAction")

            insDiv.setAttribute("style", "grid-template-columns: repeat(7, 1fr)")

            insDiv.innerHTML = this.insertTemplate
        }


        if (newValue == 1) {
            document.querySelector(".sOptions").style.display = "block"

            let srchDiv = document.querySelector(".actBody")
            document.querySelector(".search").classList.add("selAction")
            document.querySelector(".insert").classList.remove("selAction")

            srchDiv.setAttribute("style", "grid: none")
            srchDiv.setAttribute("style", "display: none")

            srchDiv.innerHTML =""
        }
    }

  },

  methods: {

    resetInputs() {
        document.getElementById('rnc').value =""
        document.getElementById('rsocial').value =""
        document.getElementById('ncf').value =""
        document.getElementById('fecha').value =""
        document.getElementById('tgrabado').value =""
        document.getElementById('texcento').value =""
        document.getElementById('proplegal').value =""
        document.getElementById('itbis').value =""
        document.getElementById('tfacturado').value =""
        document.getElementById('category').value =""

        let consm = document.getElementsByName('nfc')

        for(let i = 0; i < consm.length; i++) {
            if (consm[i].checked == true) {
                consm[i].checked = false;
            }
        }

        document.getElementById("bImg").value = ""
        document.getElementById("shImg").src = "";
        this.img = "";
    
    },

    insertFace() {
        this.action = 0
        
        axios.get('/api/cat')
        .then(res => {
            let preCats = res.data.categories
            let nHTML = '<option>Categories...</option>'

            for (let i = 0; i < preCats.length; i++) {
                nHTML += `<option>${preCats[i]}</option>`
            }
            document.getElementById('category').innerHTML = nHTML
        })

        setTimeout(() => {
            if (this.$store.getters.modeGetter) {
            document.querySelector(".borderdv").classList.add('lightMode')
            document.querySelector(".billInfo").classList.add('lightMode')
            document.querySelector(".borderdv").classList.remove('darkMode')
            document.querySelector(".billInfo").classList.remove('darkMode')

        } else {
            document.querySelector(".borderdv").classList.remove('lightMode')
            document.querySelector(".billInfo").classList.remove('lightMode')
            document.querySelector(".borderdv").classList.add('darkMode')
            document.querySelector(".billInfo").classList.add('darkMode')
        }
        document.querySelector("#sendData").addEventListener("click", this.uploadDataform)

        }, 300)
    },

    searchFace() {
        this.action = 1

        document.querySelector(".sOptions").style.border = "1px solid #000"
        document.querySelector(".sOptions").style.borderRadius = "5px"

        axios.get('/api/cat')
        .then(res => {
            let preCats = res.data.categories
            let nHTML = '<option>Categories...</option>'

            for (let i = 0; i < preCats.length; i++) {
                nHTML += `<option>${preCats[i]}</option>`
            }
            document.getElementById('sbCat').innerHTML = nHTML
        })
    },

    imgChange() {
        let imgFile = document.getElementById("bImg")
        let imgTag = document.getElementById("shImg")

        this.img = imgFile.files[0]
        let fr = new FileReader()
        fr.readAsDataURL(imgFile.files[0])

        fr.onload = function() {
            imgTag.src = fr.result
        }

    },

    uploadDataform() {

        let billDataform = new FormData

        billDataform.append('rnc', document.getElementById('rnc').value)
        billDataform.append('r_social', document.getElementById('rsocial').value)
        billDataform.append('ncf', document.getElementById('ncf').value)
        billDataform.append('fecha', document.getElementById('fecha').value + " 00:30:00")
        billDataform.append('t_grabado', document.getElementById('tgrabado').value)
        billDataform.append('t_excento', document.getElementById('texcento').value)
        billDataform.append('prop_legal', document.getElementById('proplegal').value)
        billDataform.append('itbis', document.getElementById('itbis').value)
        billDataform.append('t_facturado', document.getElementById('tfacturado').value)
        billDataform.append('bView', this.img)
        billDataform.append('category', document.getElementById('category').value)

        let consm = document.getElementsByName('nfc')

        for(let i = 0; i < consm.length; i++) {
            if (consm[i].checked == true) {
                billDataform.append('consumo', consm[i].value)
            }
        }

    axios
      .post("/api/billing", billDataform, {headers:{'Content-Type':'multipart/form-data'}})

      .then((response)=> {

        let valResult = response.data.validation

        if (valResult) {

            if(valResult.res) {
                document.getElementById('result').innerHTML =`
                    <p class="resOK">Record made successfully!</p>
                `
                this.resetInputs()
                setTimeout(() =>{document.getElementById('result').innerHTML =""}, 5000)
            } else {
                document.getElementById('result').innerHTML =`
                    <p class="resWRONG">Something went wrong</p>
                `
                setTimeout(() =>{document.getElementById('result').innerHTML =""}, 5000)
            }

            if (valResult.rncMsg) {
                document.getElementById('rnc').classList.add('invalidInput')

                document.getElementById('rnc').addEventListener("input", function() {
                    document.getElementById('rnc').classList.remove('invalidInput')
                })
            }

            if (valResult.rsMsg) {
                document.getElementById('rsocial').classList.add('invalidInput')

                document.getElementById('rsocial').addEventListener("input", function() {
                    document.getElementById('rsocial').classList.remove('invalidInput')
                })
            }

            if (valResult.ncfMsg) {
                document.getElementById('ncf').classList.add('invalidInput')
                document.getElementById('ncf').addEventListener("input", function() {
                    document.getElementById('ncf').classList.remove('invalidInput')
                })
            }

            if (valResult.fechMsg) {
                document.getElementById('fecha').classList.add('invalidInput')
                document.getElementById('fecha').addEventListener("input", function() {
                    document.getElementById('fecha').classList.remove('invalidInput')
                })
            }

            if (valResult.tfMsg) {
                document.getElementById('tfacturado').classList.add('invalidInput')

                document.getElementById('tfacturado').addEventListener("input", function() {
                    document.getElementById('tfacturado').classList.remove('invalidInput')
                })
            }

            if (valResult.tgMsg) {
                document.getElementById('tgrabado').classList.add('invalidInput')

                document.getElementById('tgrabado').addEventListener("input", function() {
                    document.getElementById('tgrabado').classList.remove('invalidInput')
                })
            }

            if (valResult.consMsg) {
                document.getElementById('radioC').classList.add('invalidInput')
                document.getElementById('radioC').addEventListener("input", function() {
                    document.getElementById('radioC').classList.remove('invalidInput')
                })
            }

            if (valResult.catMsg) {
                document.getElementById('category').classList.add('invalidInput')
                document.getElementById('category').addEventListener("input", function() {
                    document.getElementById('category').classList.remove('invalidInput')
                })
            }

        }
      })

      .catch(()=> {
            document.getElementById('result').innerHTML =`
                    <p class="resWRONG">Error while sending data</p>
                `
            setTimeout(() =>{document.getElementById('result').innerHTML =""}, 5000)
      })

    },

    runQuery() {
        let queryParams = {}
        let sbDate = document.getElementById('sbDate').value
        let sbYear  = document.getElementById('sbYear').value
        let sbMonth = document.getElementById('sbMonth').value
        let sbRNC = document.getElementById('sbRNC').value
        let sbNCF = document.getElementById('sbNCF').value
        let consm = document.getElementsByName('sbCons')
        let Cat = document.getElementById('sbCat').value

        if (sbDate) {queryParams.Date = sbDate + " 00:30:00"}
        if (sbYear) {queryParams.Year = sbYear}
        if (sbMonth) {queryParams.Month = sbMonth}
        if (sbRNC) {queryParams.RNC = sbRNC}
        if (sbNCF) {queryParams.NCF = sbNCF}
        if (Cat !== undefined && Cat != 'Categories...') {queryParams.Category = Cat}

        for(let i = 0; i < consm.length; i++) {
            if (consm[i].checked == true) {
                queryParams.Consumo = consm[i].value
            }
        }

        if (Object.keys(queryParams).length == 0) {
            document.getElementById('Qresult').innerHTML =`
                    <p class="resWRONG">First you must set any filter option</p>
                `
            return setTimeout(() =>{document.getElementById('Qresult').innerHTML =""}, 5000)
        }

        axios.get("/api/billing", {
            params: queryParams
        })
        .then(response => {

            let valData = response.data

            if(!valData.res) {
                document.getElementById('Qresult').innerHTML =`
                    <p class="resWRONG">Something went wrong</p>
                `
                setTimeout(() =>{document.getElementById('Qresult').innerHTML =""}, 5000)
            } else {
                document.getElementById('Qresult').innerHTML =`
                    <p class="resOK">Query made successfully!</p>
                `
                setTimeout(() =>{document.getElementById('Qresult').innerHTML =""}, 5000)
            }

            if (valData.fechMsg) {
                document.getElementById('sbDate').classList.add('invalidInput')
                document.getElementById('sbDate').addEventListener("input", function() {
                    document.getElementById('sbDate').classList.remove('invalidInput')
                })
            }

            if (valData.yearMsg) {
                document.getElementById('sbYear').classList.add('invalidInput')
                document.getElementById('sbYear').addEventListener("input", function() {
                    document.getElementById('sbYear').classList.remove('invalidInput')
                })
            }

            if (valData.monthMsg) {
                document.getElementById('sbMonth').classList.add('invalidInput')
                document.getElementById('sbMonth').addEventListener("input", function() {
                    document.getElementById('sbMonth').classList.remove('invalidInput')
                })
            }

            if (valData.ncfMsg) {
                document.getElementById('sbNCF').classList.add('invalidInput')
                document.getElementById('sbNCF').addEventListener("input", function() {
                    document.getElementById('sbNCF').classList.remove('invalidInput')
                })
            }

            if (valData.rncMsg) {
                document.getElementById('sbRNC').classList.add('invalidInput')
                document.getElementById('sbRNC').addEventListener("input", function() {
                    document.getElementById('sbRNC').classList.remove('invalidInput')
                })
            }

            //Here you'll receive the query result if given

            let resHTML = ""
            let recData = valData.data

            document.getElementById('queryResult').innerHTML = ''

            if(recData) {

                if (recData == "*") {

                        resHTML +=`
                            <div class="resContainer">
                                <h2>No results found</h2>
                            </div>
                        `
                    document.querySelector(".actBody").setAttribute("style", "display: block")
                    document.getElementById('queryResult').innerHTML = resHTML

                } else if (recData !== "*") {

                    for (let i = 0; i < recData.length; i++) {

                        let bKind = ''
                        let childTheme = ''

                        if(this.cMode) {
                            childTheme = 'childLight'
                        } else {
                            childTheme = 'childDark'
                        }

                        if (recData[i].consumo == true) {
                            bKind = ' <span class="cons">(Final consumer)</span>'
                        }

                        resHTML +=`
                            <div id="Res${i}" class="resContainer">
                                <div id="ResultChild" class="${childTheme}">

                                    <div class="data">

                                        <div class="elOptions" tag="Res${i}" name="bDel">
                                            <p>X</p>
                                        </div>

                                        <h3><span class="ncf">${recData[i].ncf + '</span>' + bKind}</h3>
                                        <p><span>RNC: </span>${recData[i].rnc}</p>
                                        <p><span>Vendor: </span>${recData[i].r_social}</p>
                                        <p class="date"><span>Date: </span>${new Date(recData[i].fecha)}</p>
                                        <p><span>Category: </span>${recData[i].category}</p>
                                        <p><span>Total: </span>DOP $${recData[i].t_grabado}</p>
                                        <p><span>ITBIS: </span>DOP $${recData[i].itbis}</p>
                                        <p><span>ITBIS free: </span>DOP $${recData[i].t_excento}</p>
                                        <p><span>Legal tip: </span>DOP $${recData[i].prop_legal || 0}</p>
                                        <p><span>Total paid: </span>DOP $${recData[i].t_facturado}</p>
                                    </div>

                                    <div class="bimg">
                                    <img src="${recData[i].bView}">
                                    </div>

                                    <div class="meta">
                                        <p><span>Registered: </span>${new Date(recData[i].rDate)}</p>
                                        <p><span>Made by: </span>${recData[i].rUser}</p>
                                    </div>
                                </div>
                            </div>
                        `
                    }
                    document.querySelector(".actBody").setAttribute("style", "display: block")
                    document.getElementById('queryResult').innerHTML = resHTML

                    let Deleters = document.getElementsByName("bDel")

                    for(let i = 0; i < Deleters.length; i++) {

                        Deleters[i].addEventListener("click", function(e) {
                            let f = e.currentTarget.getAttribute('tag')

                            let bContainer = document.getElementById(f)
                            let ncf = undefined, year = undefined

                            let x = bContainer.getElementsByClassName('ncf')
                            x.forEach(el => {
                                ncf = el.innerText
                            })

                            let z = bContainer.getElementsByClassName('date')
                            z.forEach(el => {
                                year = el.innerText
                            })

                            year = new Date(year.substring(6, year.length)).getFullYear()

                            axios.delete("/api/billing", {
                                params: {ncf, year}
                            })
                            .then(res => {
                                if(res.status == 200) {

                                    let victim = document.getElementById(f)
                                    victim.remove()

                                }
                            })

                        })
                    }
                }
            }
        })
        .catch(() => {

            //if (response.status == 400) {
                document.getElementById('Qresult').innerHTML =`
                    <p class="resWRONG">Server unreachable or rejected request</p>
                `
                return setTimeout(() =>{document.getElementById('Qresult').innerHTML =""}, 5000)
            //}
        })
    }

  },

  mounted: function () {
    document.querySelector("#bImg").addEventListener("change", this.imgChange)
    document.querySelector("#sendData").addEventListener("click", this.uploadDataform)

    if (this.$store.getters.modeGetter) {
        document.querySelector(".borderdv").classList.add('lightMode')
        document.querySelector(".billInfo").classList.add('lightMode')
        document.querySelector(".sOptions").classList.add('lightMode')

        document.querySelector(".borderdv").classList.remove('darkMode')
        document.querySelector(".billInfo").classList.remove('darkMode')
        document.querySelector(".sOptions").classList.remove('darkMode')

    } else {
        document.querySelector(".borderdv").classList.remove('lightMode')
        document.querySelector(".billInfo").classList.remove('lightMode')
        document.querySelector(".sOptions").classList.remove('lightMode')

        document.querySelector(".borderdv").classList.add('darkMode')
        document.querySelector(".billInfo").classList.add('darkMode')
        document.querySelector(".sOptions").classList.add('darkMode')
    }

        axios.get('/api/cat')
        .then(res => {
            let preCats = res.data.categories
            let nHTML = '<option>Categories...</option>'

            for (let i = 0; i < preCats.length; i++) {
                nHTML += `<option>${preCats[i]}</option>`
            }
            document.getElementById('category').innerHTML = nHTML
        })

        document.getElementById('sbDate').addEventListener("input", function() {
            if(document.getElementById('sbDate').value) {
                document.getElementById('sbYearDiv').style.display = "none"
                document.getElementById('sbMonthDiv').style.display = "none"

                document.getElementById('sbYear').value = ""
                document.getElementById('sbMonth').value = ""
            } else {
                document.getElementById('sbYearDiv').style.display = "inline-block"
                document.getElementById('sbMonthDiv').style.display = "inline-block"
            }
        })
        
        document.getElementById('sbYear').addEventListener("input", function() {
            if (document.getElementById('sbYear').value > 0 || document.getElementById('sbMonth').value > 0) {
                document.getElementById('sbDateDiv').style.display = "none"
                document.getElementById('sbDate').value =""
            }
            else {document.getElementById('sbDateDiv').style.display = "inline-block"}

        })

        document.getElementById('sbMonth').addEventListener("input", function() {
            if (document.getElementById('sbMonth').value > 0 || document.getElementById('sbYear').value > 0) {
                document.getElementById('sbDateDiv').style.display = "none"
                document.getElementById('sbDate').value =""
            }
            else {document.getElementById('sbDateDiv').style.display = "inline-block"}
 
        })

  }

}
</script>

<style>

*{
   font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;

}

.actContnr {
    padding-top: 55px;
    padding-left: 15px;
    padding-bottom: 25px;
}

.actHeader {
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

.act {
    text-align: center;
}

.act .iconlf {
    margin-left: 20px;
}

.act span {
    padding: 0 3px 0 3px;
    border: 1px solid #979797;
    border-radius: 5px;
    color: #979797;
}

.act span:hover {
    background: #a3a3a3;
    color: #cecece;
}

.actBody {
    margin: 15px 55px 0 45px;

    padding: 0 15px 15px 15px;

    display: grid;

    grid-gap: 6px;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(1, auto);

    grid-template-areas:  "d1 d1 d2 d2 d2 d2 d2";

}

.borderdv {
    grid-area: d2;
    border: 1px solid #000;
    padding: 10px;
    border-radius: 10px;

    display: grid;

    grid-gap: 6px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(1, auto);

    grid-template-areas:  "r1 r1 r2 r2 r2";
    box-shadow: 0 0 5px #696969;
}

.billInfo {
    grid-area: d1;
    border: 1px solid #000;
    border-radius: 10px;
    padding: 10px;
    margin: 0 10px 0 0;
    box-shadow: 0 0 5px #696969;
}

.billMeta {

    border-radius: 10px;
    margin: 0 0 0 10px;
    grid-area: r1;
}

.billImg {
    grid-area: r2;
    display: flex;
    justify-content: center;
    align-items: center;
}



.sOptions {

    margin: 15px 55px 25px 45px;
    padding: 10px 10px 10px 10px;
    box-shadow: 0 0 5px #696969;
    display: none;
}

.sOptions div {
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    display: inline-block;
    padding: 5px 10px 5px 10px;
    margin: 0 0 10px 0;
    max-height: 67px;
    min-height: 67px;
}

#sbConsDiv {
    padding: 5px 25px 5px 10px;

}

.sOptions h3 {
    margin: 10px;
}

section {
    display: flex;
    justify-content: center;
    align-items: center;
}

.selAction {
    box-shadow: 1px 2px 3px #00003e;
    background: #d6d6d6;
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

select {
    margin: 10px 0 15px 25px;
    padding: 2px 5px 2px 5px;
    width: 165px;
    display: block;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #888;
}

input[type=number] {
    -moz-appearance: textfield;
    width: 120px;
    border-radius: 5px;
    border: 1px solid #888;
}

input[type=radio] {
    display: inline-block;
}

input[type=text] {
    width: 210px;
    border-radius: 5px;
    border: 1px solid #888;
}

input[type=date] {
    width: 140px;
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

button {
    width: 130px;
    height: 30px;
    font-size: 18px;
}

label {
    font-size: 18px;
}

.billMeta p {
    margin: 10px 0 0 5px;
}

#shImg {
    max-width: 500px;
    border: 1px dashed #888;
}

.invalidInput {
    border: 1px solid #ff0000;
    box-shadow: 0 0 7px #ff000085;
    border-radius: 5px;
}

.resOK {
    background: #529c52;
    border-bottom: 3px solid #00aa00;
    text-align: center;
    color: #fff;
    padding: 5px 15px 5px 15px;
    border-radius: 5px;
}

.resWRONG {
    background: #b35656;
    border-bottom: 3px solid #aa0000;
    text-align: center;
    color: #fff;
    padding: 5px 15px 5px 15px;
    border-radius: 5px;
}


.lightMode {

    transition: .5s;

}

.darkMode {
   color: #fff;

}

#Qresult {
    display: flex;
    border: none;
    justify-content: center;
    max-height: 50px;
    padding: 10px 0 0 0;
}

#queryResult .resContainer .childLight:hover {
    background: #dadada;
    transition: .5s;
}

#queryResult .resContainer  .childDark:hover {
    background: #464650;
    transition: .5s;
}

#ResultChild {
    max-width: 875px;
    border: 2px solid #d3d3d3;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 15px;
    box-shadow: 3px 0 2px #696969;

    display: grid;

    grid-gap: 10px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, auto);

    grid-template-areas:  "z1 z1 z3"
                            "z1 z1 z3"
                            "z2 z2 z3";
    transition: .5s;
}

#ResultChild .data {
    grid-area: z1;
}

#ResultChild .bimg {
    grid-area: z3;
    display: flex;
    align-items: center;
    justify-content: center;
}

#ResultChild .bimg img{
    height: auto;
    max-width: 400px;
    border-radius: 5px;
    border: dashed 1px #888;
}

#ResultChild .meta {
    grid-area: z2;
}

#queryResult .resContainer  {
    display:flex;
    justify-content: center;
}

#ResultChild h3 {
    margin: 0 0 10px 15px;

    display: inline-block;
}

#ResultChild h3 .ncf{

    font-size: 25px;

}

#ResultChild h3 .cons{
    font-weight: normal;
    font-size: 15px;

}

#ResultChild p{
    font-weight: normal;
    font-size: 16px;
    margin: 5px 0 5px 0;

}

#ResultChild span{
    font-weight: bold;
    font-size: 17px;

}

#ResultChild .meta{
    padding: 15px 0 0 25px;

}

#ResultChild .elOptions {

    padding: 3px 0 0 0;
    display: inline-block;
    height: 27px;
    width: 30px;
    top: -3px;
    align-self: flex-end;
    position:relative;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background: #ff000025;
    border: 1px solid #d3d3d3;

    cursor: pointer;
    transition: .5s;

}

#ResultChild .elOptions:hover {
    background: #ff000075;
    transition: .5s;
}

#ResultChild .elOptions p {
    margin: 0;
    font-size: 20px;
    cursor: pointer;
    text-align: center;
}

#sbNCFDiv, #sbNCatDiv {
    border-right: none;
}

#sbDateDiv, #sbConsDiv {
    border-left: none;
}

@media screen and (max-width: 1250px) {
    #shImg {
        max-width: 450px;
    }
}

@media screen and (max-width: 1200px) {
    #shImg {
        max-width: 400px;
    }
}

@media screen and (max-width: 1090px) {

    .actBody {

        display: grid;

        grid-gap: 4px;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, auto);

        grid-template-areas:  "d1 d1 d1 d1"
                                "d2 d2 d2 d2";
    }

    .borderdv {
        max-width: 900px;
        width: auto;
        min-width: 640px;
        padding-left: 0;
    }

    .billImg {
        max-width: 525px;
    }

    .billInfo {
        max-width: 900px;
        width: auto;
        min-width: 630px;
        margin-right: 0;
    }

    input[type=number] {
        width: 150px;
    }

    input[type=text] {
        width: 250px;
    }

    #shImg {
        max-width: 500px;
    }

}

@media screen and (max-width: 950px) {
    #shImg {
        max-width: 400px;
    }
}

@media screen and (max-width: 820px) {
    #shImg {
        max-width: 375px;
    }
}

@media screen and (max-width: 775px) {
    #shImg {
        max-width: 350px;
    }
}


</style>