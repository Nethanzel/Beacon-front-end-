<script>

import { HorizontalBar } from 'vue-chartjs'

export default {
    extends: HorizontalBar,

    mounted() {

        if (this.cMode == true) { 
            //this.options.scales.xAxes[0].gridLines.zeroLineColor = 'rgba(0, 0, 0, 1)'
            this.chartData.datasets[0].backgroundColor = 'rgba(50, 50, 150, 0.55)'
            this.chartData.datasets[0].borderColor = "rgba(0, 0, 0, 0.8)"
            this.renderChart(this.chartData, this.options)
        } else {
            //this.options.scales.xAxes[0].gridLines.zeroLineColor = 'rgba(255, 255, 255, 1)'
            this.chartData.datasets[0].backgroundColor = 'rgba(255, 255, 255, 0.55)'
            this.chartData.datasets[0].borderColor = "rgba(50, 50, 150, 0.85)"
            this.renderChart(this.chartData, this.options)
        }
    },

    props: {
        filter: undefined
    },

    data() {
        return {

            chartData: {

                labels: [],

                datasets: [{
                    data: [],
                    label: "DOP $",
                    borderWidth: 1,
                    backgroundColor: 'rgba(50, 50, 150, 0.55)',
                    borderColor: "rgba(0, 0, 0, 0.8)",
                }]

            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                
                legend: {
                    display: false,
                    position: 'bottom'
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            zeroLineColor: 'rgba(150, 150, 150, 1)'
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true
                        },
                        
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            drawOnCharArea: false,
                            zeroLineColor: 'rgba(0, 0, 0, 0)'
                        },
                        ticks: {
                            beginAtZero: false
                        }
                       

                    }]
                }

            },
            firstLoad: true
        }

    },

    computed: {

        cMode() {
            return this.$store.getters.modeGetter
        },

        myData() {
            return this.$store.getters.chartsGetter
        },

        getFilter() {
            return this.filter
        },

    },

    watch: {

        cMode(newVal) {

          if (newVal == true) { 
            //this.options.scales.xAxes[0].gridLines.zeroLineColor = 'rgba(250, 0, 0, 1)'
            this.chartData.datasets[0].backgroundColor = 'rgba(50, 50, 150, 0.55)'
            this.chartData.datasets[0].borderColor = "rgba(0, 0, 0, 0.8)"
            this.renderChart(this.chartData, this.options)
          } else {
            //this.options.scales.xAxes[0].gridLines.zeroLineColor = 'rgba(255, 255, 255, 1)'
            this.chartData.datasets[0].backgroundColor = 'rgba(255, 255, 255, 0.55)'
            this.chartData.datasets[0].borderColor = "rgba(50, 50, 150, 0.85)"
            this.renderChart(this.chartData, this.options)
          }
        },

        getFilter(newFilter) {

            if (!this.firstLoad) {

                let fYear = 0, fMonth = 0

                if (newFilter == 'This week') {

                    //Getting the week span
                    let date = new Date()
                    let today = date.getDay()

                    while (today > 0) { //gets the sunday
                        date.setDate(date.getDate() -1)
                        today--
                    }

                    let sunday = new Date(date)
                    let week = [sunday]
                    let increase = 6

                    while (increase > 0) { //gets the week range starting from the sunday (date up here)
                        let newDate = new Date(date.setDate(date.getDate() + 1))
                        week.push(newDate)
                        increase--
                    }
                    //Got the week span, now make filtering by dates
                    let days = []

                    week.forEach((val) => { //gets the month day
                        days.push(new Date(val).getDate())
                    })
                    //From here filters the data base on the up process

                    fYear = (new Date()).getFullYear()
                    fMonth = (new Date()).getMonth() + 1

                    let data = new Array()

                    for (let i = 0; i < this.myData.length; i++) {

                        if (this.myData[i].selector == fYear) { //Finds the element by selector property
                            data = this.myData[i].data
                        }
                    }

                    let thisData = new Array()

                    for (let i = data.length - 1; i > -1; i--) {
                        if ((new Date(data[i].fecha)).getMonth() + 1 == fMonth) {//if not this month, removes the element
                            thisData.push(data[i])
                        }
                    }

                    for (let i = thisData.length - 1; i > -1; i--) {
                        if (!days.includes((new Date(thisData[i].fecha)).getDate())) {//Matches the element's day with the collection of days of this week
                            thisData.splice(i, 1)
                        }
                    }
//

                    let cats = [], catsVal = []

                    for (let i = 0; i < thisData.length; i++) {
                        if (!cats.includes(thisData[i].category)) {
                            cats.push(thisData[i].category)
                            catsVal.push(0)
                        }
                    }

                    for (let i = 0; i < cats.length; i++) {
                        for (let x = 0; x < thisData.length; x++) {
                            if(cats[i] == thisData[x].category) {
                                catsVal[i] += parseInt(thisData[x].t_facturado)
                            }
                        }
                    }

                    this.chartData.labels = cats
                    this.chartData.datasets[0].data =  catsVal
                    this.renderChart(this.chartData, this.options)

                } else if (newFilter == 'This month') {

                    fYear = (new Date()).getFullYear()
                    fMonth = (new Date()).getMonth() + 1

                    let data = undefined

                    for (let i = 0; i < this.myData.length; i++) {

                        if (this.myData[i].selector == fYear) {
                            data = this.myData[i].data
                        }
                    }

                    let thisData = new Array()

                    for (let i = data.length - 1; i > -1; i--) {
                        if ((new Date(data[i].fecha)).getMonth() + 1 == fMonth) {
                            thisData.push(data[i])
                        }
                    }
//

                    let cats = [], catsVal = []

                    for (let i = 0; i < thisData.length; i++) {
                        if (!cats.includes(thisData[i].category)) {
                            cats.push(thisData[i].category)
                            catsVal.push(0)
                        }
                    }

                    for (let i = 0; i < cats.length; i++) {
                        for (let x = 0; x < thisData.length; x++) {
                            if(cats[i] == thisData[x].category) {
                                catsVal[i] += parseInt(thisData[x].t_facturado)
                            }
                        }
                    }

                    this.chartData.labels = cats
                    this.chartData.datasets[0].data =  catsVal
                    this.renderChart(this.chartData, this.options)

                } else if (newFilter == 'This year') {

                    fYear = (new Date()).getFullYear()

                    let data = undefined

                    for (let i = 0; i < this.myData.length; i++) {

                        if (this.myData[i].selector == fYear) {
                            data = this.myData[i].data
                        }
                    }
//
                let cats = [], catsVal = []

                for (let i = 0; i < data.length; i++) {
                    if (!cats.includes(data[i].category)) {
                        cats.push(data[i].category)
                        catsVal.push(0)
                    }
                }

                for (let i = 0; i < cats.length; i++) {
                    for (let x = 0; x < data.length; x++) {
                        if(cats[i] == data[x].category) {
                            catsVal[i] += parseInt(data[x].t_facturado)
                        }
                    }
                }

                    this.chartData.labels = cats
                    this.chartData.datasets[0].data =  catsVal
                    this.renderChart(this.chartData, this.options)
                }

            }
        },

        myData(newData) {

            let fYear = 0, fMonth = 0
            let filter = this.getFilter

            if (filter == 'This week') {

                    //Getting the week span
                    let date = new Date()
                    let today = date.getDay()

                    while (today > 0) { //gets the sunday
                        date.setDate(date.getDate() -1)
                        today--
                    }

                    let sunday = new Date(date)
                    let week = [sunday]
                    let increase = 6

                    while (increase > 0) { //gets the week range starting from the sunday (date up here)
                        let newDate = new Date(date.setDate(date.getDate() + 1))
                        week.push(newDate)
                        increase--
                    }
                    //Got the week span, now make filtering by dates
                    let days = []

                    week.forEach((val) => { //gets the month day
                        days.push(new Date(val).getDate())
                    })
                    //From here filters the data base on the up process

                    fYear = (new Date()).getFullYear()
                    fMonth = (new Date()).getMonth() + 1

                    let data = undefined

                    for (let i = 0; i < this.myData.length; i++) {

                        if (this.myData[i].selector == fYear) { //Finds the element by selector property
                            data = this.myData[i].data
                        }
                    }

                    let thisData = new Array()

                    for (let i = data.length - 1; i > -1; i--) {
                        if ((new Date(data[i].fecha)).getMonth() + 1 == fMonth) {
                            thisData.push(data[i])
                        }
                    }

                    for (let i = thisData.length - 1; i > -1; i--) {
                        if (!days.includes((new Date(thisData[i].fecha)).getDate())) {//Matches the element's day with the collection of days of this week
                            thisData.splice(i, 1)
                        }
                    }

                    let cats = [], catsVal = []

                    for (let i = 0; i < thisData.length; i++) {
                        if (!cats.includes(thisData[i].category)) {
                            cats.push(thisData[i].category)
                            catsVal.push(0)
                        }
                    }

                    for (let i = 0; i < cats.length; i++) {
                        for (let x = 0; x < thisData.length; x++) {
                            if(cats[i] == thisData[x].category) {
                                catsVal[i] += parseInt(thisData[x].t_facturado)
                            }
                        }
                    }

                    this.chartData.labels = cats
                    this.chartData.datasets[0].data =   catsVal
                    this.renderChart(this.chartData, this.options)

            } else if (filter == 'This month') {

                fYear = (new Date()).getFullYear()
                fMonth = (new Date()).getMonth() + 1

                let data = undefined

                for (let i = 0; i < newData.length; i++) {

                    if (newData[i].selector == fYear) {
                        data = newData[i].data
                    }
                }

                let thisData = new Array()

                for (let i = data.length - 1; i > -1; i--) {
                    if ((new Date(data[i].fecha)).getMonth() + 1 == fMonth) {
                        thisData.push(data[i])
                    }
                }

                let cats = [], catsVal = []

                for (let i = 0; i < thisData.length; i++) {
                    if (!cats.includes(thisData[i].category)) {
                        cats.push(thisData[i].category)
                        catsVal.push(0)
                    }
                }

                for (let i = 0; i < cats.length; i++) {
                    for (let x = 0; x < thisData.length; x++) {
                        if(cats[i] == thisData[x].category) {
                            catsVal[i] += parseInt(thisData[x].t_facturado)
                        }
                    }
                }

                this.chartData.labels = cats
                this.chartData.datasets[0].data =  catsVal
                this.renderChart(this.chartData, this.options)

            } else if (filter == 'This year') {

                fYear = (new Date()).getFullYear()

                let data = undefined

                for (let i = 0; i < newData.length; i++) {

                    if (newData[i].selector == fYear) {
                        data = newData[i].data
                    }
                }

                let cats = [], catsVal = []

                for (let i = 0; i < data.length; i++) {
                    if (!cats.includes(data[i].category)) {
                        cats.push(data[i].category)
                        catsVal.push(0)
                    }
                }

                for (let i = 0; i < cats.length; i++) {
                    for (let x = 0; x < data.length; x++) {
                        if(cats[i] == data[x].category) {
                            catsVal[i] += parseInt(data[x].t_facturado)
                        }
                    }
                }

                this.chartData.labels = cats
                this.chartData.datasets[0].data = catsVal

                this.renderChart(this.chartData, this.options)
            }

            this.firstLoad = false
        }

    }
}

</script>

<style>


</style>