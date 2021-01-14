<template>

  <div id="body">

    <div class="grid">
   
      <div class="g1">
        <h2 class="tDay">Today</h2>

        <span class="tDayStat">{{this.todayReg}} registres</span>

        <barChart @Changed="todayCount" :styles="barStyles" />

      </div>

      <div class="g2">
        <div>
          <h1 class="spamControl">Top categories</h1>

          <spamPicker @spamChanged="getCatSelection" v-bind:list="['This week', 'This month', 'This year']" :pos="0"/>

          <div class="barChart">
            <HorizontalBarChart :styles="barChartStyles" v-bind:filter="catSpamVal"/>
          </div>
        </div>

        <div class="summary">

          <div class="sumHead">
            <h2 class="Sum">Summary</h2>

            <spamPicker @spamChanged="getSumSelection" v-bind:list="['Today', 'This week', 'This month', 'This year']" :pos="1"/>

          </div>

          <div class="sumTable">
            <table>
              
              <tr>
                <td class="tdH"><span id="b1" class="sumBullet1">■</span>Expenses:</td><td>DOP$ {{this.summary[0]}}</td>
              </tr>

              <tr>
                <td class="tdH"><span id="b2" class="sumBullet2">■</span>Taxes:</td> <td>DOP$ {{this.summary[1]}}</td>
              </tr>

              <tr>
                <td class="tdH"><span id="b3" class="sumBullet3">■</span>Taxes free:</td> <td>DOP$ {{this.summary[2]}}</td>
              </tr>

              <tr>
                <td class="tdH tbLine" id="tbL1">Total:</td><td class="tbLine" id="tbL2">DOP$ {{this.summary[0] + this.summary[1]}}</td> <td><span class="tableDayStat">From {{this.summary[3]}} registres</span></td>
              </tr>

            </table>
          </div>
          

          <div class="cirChart">
            <cirChart @summaryChanged="getSummayValues" :styles="cirChartStyles" v-bind:filter="sumSpamVal"/>
          </div>

        </div>
      </div>

      <div class="g3">
        <h2 class="tLine">Timeline</h2>

        <div>
          <lineChart @linesChanged="getLinesValues" :styles="lineChartStyles"/>
        </div>

        <div class="infoSpan">
          <p><span class="thisBullet">●</span> <span>This year</span> <span class="monthStat">{{this.linesReg[0]}} registres</span></p>
          <p><span class="lastBullet">●</span> <span>Last year</span> <span class="monthStat">{{this.linesReg[1]}} registres</span></p>
        </div>
        
      </div>
    </div>

    <asideMenu/>
  </div>

</template>

<script>

import asideMenu from '../components/asidemenu.vue'
import spamPicker from '../components/spamPicker.vue'
import lineChart from '../components/lineChart.vue'
import barChart from '../components/barsChart'
import HorizontalBarChart from '../components/horizontalBarsChart.vue'
import cirChart from '../components/cirChart.vue'

export default {
  name: 'dashboard',
  title: 'Beacon | Dashboard',

  components: {
    asideMenu,
    spamPicker,
    lineChart,
    HorizontalBarChart,
    barChart,
    cirChart

  },


  computed: {

    lineChartStyles() {
      return {
        height: '320px',
        position: 'relative',
        'min-width': '420px',
        //'max-width': '525px',
        'margin-top': '5px'
      }
    },

     barChartStyles() {
      return {
        height: '320px',
        width: '625px',
        'min-width': '420px',
        'max-width': '525px',
      }
    },

     barStyles() {
      return {
        height: '165px',
        'min-width': '420px',
        //'max-width': '525px',
        'margin-top': '5px'
      }
    },

    cirChartStyles() {
      return {
        height: '250px',
        width: '250px',
        'align-self': 'center',
        'margin-top': '5px'
      }
    },

    cMode() {
      return this.$store.getters.modeGetter
    },

    sumSpamVal() {
      return this.sumSpam
    },

    catSpamVal() {
      return this.catSpam
    }

  },

    watch: {
    
      cMode: function (newVal) {

          if (newVal == true) {
            let tbl1 = document.getElementById('tbL1')
            let tbl2 = document.getElementById('tbL2')
            let b1 = document.getElementById('b1')
            let b2 = document.getElementById('b2')
            let b3 = document.getElementById('b3')

            b1.classList.add('sumBullet1')
            b1.classList.remove('sumBullet1dark')

            b2.classList.add('sumBullet2')
            b2.classList.remove('sumBullet2dark')

            b3.classList.add('sumBullet3')
            b3.classList.remove('sumBullet3dark')

            tbl1.style.borderTop = "2px solid #000"
            tbl2.style.borderTop = "2px solid #000"
            tbl1.style.transition = ".5s"
            tbl2.style.transition = ".5s"

          } else {
            let tbl1 = document.getElementById('tbL1')
            let tbl2 = document.getElementById('tbL2')

            let b1 = document.getElementById('b1')
            let b2 = document.getElementById('b2')
            let b3 = document.getElementById('b3')

            b1.classList.remove('sumBullet1')
            b1.classList.add('sumBullet1dark')

            b2.classList.remove('sumBullet2')
            b2.classList.add('sumBullet2dark')

            b3.classList.remove('sumBullet3')
            b3.classList.add('sumBullet3dark')

            tbl1.style.borderTop = "2px solid #fff"
            tbl2.style.borderTop = "2px solid #fff"
            tbl1.style.transition = ".5s"
            tbl2.style.transition = ".5s"

          }
      },

    },

    mounted() {

      if (this.$store.getters.modeGetter == true) {
            let tbl1 = document.getElementById('tbL1')
            let tbl2 = document.getElementById('tbL2')
            let b1 = document.getElementById('b1')
            let b2 = document.getElementById('b2')
            let b3 = document.getElementById('b3')

            b1.classList.add('sumBullet1')
            b1.classList.remove('sumBullet1dark')

            b2.classList.add('sumBullet2')
            b2.classList.remove('sumBullet2dark')

            b3.classList.add('sumBullet3')
            b3.classList.remove('sumBullet3dark')

            tbl1.style.borderTop = "2px solid #000"
            tbl2.style.borderTop = "2px solid #000"
            tbl1.style.transition = ".5s"
            tbl2.style.transition = ".5s"

          } else {
            let tbl1 = document.getElementById('tbL1')
            let tbl2 = document.getElementById('tbL2')

            let b1 = document.getElementById('b1')
            let b2 = document.getElementById('b2')
            let b3 = document.getElementById('b3')

            b1.classList.remove('sumBullet1')
            b1.classList.add('sumBullet1dark')

            b2.classList.remove('sumBullet2')
            b2.classList.add('sumBullet2dark')

            b3.classList.remove('sumBullet3')
            b3.classList.add('sumBullet3dark')
            
            tbl1.style.borderTop = "2px solid #fff"
            tbl2.style.borderTop = "2px solid #fff"
            tbl1.style.transition = ".5s"
            tbl2.style.transition = ".5s"

          }

    },


    created() {

      this.$store.commit('dashGetter')

    },

    data() {
      return {
        allData: undefined, //when defined is an array of jsons
        summary: 0,
        todayReg: 0,
        linesReg: 0,
        catSpam: '',
        sumSpam: '',

      }
    },

    methods: {

      getCatSelection(value) {
        this.catSpam = value

      },

      getSumSelection(value) {
        this.sumSpam = value

      },

      getSummayValues(value) {
        this.summary = value

      },

      getLinesValues(value) {
        this.linesReg = value
      },

      todayCount(value) {
        this.todayReg = value
      },
  }

}

</script>


<style scoped>

* {

  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
}

.spamControl {
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
}

.tLine {
  display: inline-block;
  margin-right: 10px;
  font-size: 28px;
  margin-left: 10px;
}

.Sum {
  display: inline-block;
  margin-right: 15px;
  font-size: 28px;
  margin-left: 10px;
  margin-bottom: 15px;
}

.sumP > tr, td {
  padding-top: 5px;
  padding-bottom: 5px;
}

table {
  margin-left: 25px;
  margin-top: -15px;

}

.tdH {
  padding-right: 20px;
  font-weight: bold;
  font-size: 18px;
}


/* dash container style */

#body {
  height: 99.5vh;
  display: flex;
  justify-content: center;
  align-items: center;

  padding-right: 10px;
  padding-left: 20px;
}

.grid {
  margin:0;
  padding: 0;
  height: 100vh;
  width: 98vw;

  max-width: 1366px;
  max-height: 640px;

  min-width: 864px;
  min-height: 600px;

  display: grid;

  grid-gap: 6px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, auto);

  grid-template-areas:  "g2 g2 g2 g1 g1"
                        "g2 g2 g2 g3 g3"
                        "g2 g2 g2 g3 g3";

}


.g1 {

  grid-area: g1;
  box-shadow: 0 1px 3px rgb(124, 124, 124);

  padding: 5px;

  max-height: 215px;
  min-width: 450px;

  border-radius: 5px;

}


.g2 {

  padding: 5px;

  box-shadow: 0 1px 3px rgb(124, 124, 124);
  grid-area: g2;
  
  min-width: 600px;
  min-height: 630px;
  max-height: 635px;

  border-radius: 5px;

}


.g3 {

  padding: 5px;

  box-shadow: 0 1px 3px rgb(124, 124, 124);
  grid-area: g3;

  min-width: 450px;
  min-height: 415px;
  max-height: 420px;

  border-radius: 5px;
}


/* */

.tDay {
  display: inline-block;
  margin-right: 15px;
  font-size: 28px;
  margin-left: 10px;
}

.tDayStat {
  display: inline-block;
  position: relative;
  top: -5px;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  margin: 0 5px 0 5px;
  padding: 0 5px 2px 5px;

  background: #23799b;

  font-weight: bold;
  color: #fff;
  font-size: 14px;

  cursor: default;
}

.tableDayStat {

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  margin: 0 5px 0 15px;
  padding: 0 5px 2px 5px;

  background: #23799b;

  font-weight: bold;
  color: #fff;
  font-size: 14px;

  cursor: default;
}

.monthStat{
  display: inline-block;
  position: relative;
 
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  margin: 0 5px 0 15px;
  padding: 0 5px 2px 5px;

  background: #23799b;

  font-weight: bold;
  color: #fff;
  font-size: 14px;

  cursor: default;
}

.thisBullet {

  font-weight: bold;
  color: #012faf;
  font-size: 25px;
  text-shadow: 0 0 2px #fff;

}

.lastBullet {

  font-weight: bold;
  color: #918f8f;
  font-size: 25px;

}

.sumBullet1 {

  font-weight: bold;
  color: rgba(50, 50, 150, 0.85);
  font-size: 17px;
  margin-right: 7px;
}

.sumBullet2 {

  font-weight: bold;
  color: rgba(50, 50, 150, 0.55);
  font-size: 17px;
  margin-right: 7px;
}

.sumBullet3 {

  font-weight: bold;
  color: rgba(50, 50, 150, 0.35);
  font-size: 17px;
  margin-right: 7px;
}

.sumBullet1dark {

  font-weight: bold;
  color: rgba(255, 255, 255, 0.85);
  font-size: 17px;
  margin-right: 7px;
}

.sumBullet2dark {

  font-weight: bold;
  color: rgba(255, 255, 255, 0.55);
  font-size: 17px;
  margin-right: 7px;
}

.sumBullet3dark {

  font-weight: bold;
  color: rgba(255, 255, 255, 0.35);
  font-size: 17px;
  margin-right: 7px;
}


.infoSpan {
  padding-left: 40px;
}

.barChart {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.summary {
  margin-top: 15px;
  display: grid;

  /*grid-gap: 6px;*/
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);

  grid-template-areas:  "hd hd hd ch ch"
                        "inf inf inf ch ch";
}

.cirChart {
  /*border: 1px solid #000;*/
  grid-area: ch;
  max-height: 350px;

  display: flex;
  justify-content: center;

}

.sumHead {
  grid-area: hd;
  max-height: 60px;
}

.sumTable {
  grid-area: inf;

}

table {
  cursor: default;
}

h1, h2 {
  cursor: default
}



@media screen and (max-width: 1090px) {

  .grid {
    margin:0;
    padding: 0;


    max-width: 1090px;
    max-height: 600px;

    min-width: 0px;
    min-height: 0px;

    display: grid;

    grid-gap: 6px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, auto);

    grid-template-areas: "g1 g2 g2 g2"
                          "g3 g2 g2 g2"
                          "g3 g2 g2 g2";

  }

  table {
    margin-left: 15px;
    margin-top: -25px;
  }

  td {
    font-size: 16px;
  }

  .tdH {
    padding-right: 5px;
    font-weight: bold;
    font-size: 16px;
  }

}


@media screen and (max-width: 950px) {

  #body {
    height: 99.5vh;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    padding-top: 5px;
    padding-right: 0px;
    padding-left: 5px;
  }

  .grid {
    margin:0;
    padding: 0;


    max-width: 950px;
    max-height: 600px;

    min-width: 0px;
    min-height: 0px;

    display: grid;

    grid-gap: 6px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, auto);

    grid-template-areas: "g2 g2 g2 g2"
                          "g2 g2 g2 g2"
                          "g1 g1 g1 g1"
                          "g3 g3 g3 g3";

  }
.g1 {

  min-width: 600px;

}


.g2 {

  min-width: 600px;

}


.g3 {

  min-width: 600px;

}
  table {
    margin-left: 15px;
    margin-top: -25px;
  }

  td {
    font-size: 16px;
  }

  .tdH {
    padding-right: 5px;
    font-weight: bold;
    font-size: 16px;
  }

}


</style>
