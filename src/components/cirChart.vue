<script>

import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,

    mounted() {
        if (this.cMode == true) {
            this.chartData.datasets[0].backgroundColor = ['rgba(50, 50, 150, 0.85)',
                                        'rgba(50, 50, 150, 0.55)',
                                        'rgba(50, 50, 150, 0.35)']
            this.renderChart(this.chartData, this.options)
        } else {
            this.chartData.datasets[0].backgroundColor = ['rgba(205, 205, 205, 0.95)',
                                        'rgba(205, 205, 205, 0.65)',
                                        'rgba(205, 205, 205, 0.45)']
            this.renderChart(this.chartData, this.options)
        }
    },

    props: {
        filter: String
    },

    computed: {
        myData() {
            return this.$store.getters.chartsGetter
        },

        getFilter() {
            return this.filter
        },

        cMode() {
            return this.$store.getters.modeGetter
        }

    },

    watch: {
        myData(newData) {
            let fYear, fMonth, fDay = 0
            let filter = this.getFilter

            if (filter == 'Today') {

                fYear = (new Date()).getFullYear()
                fMonth = (new Date()).getMonth() + 1
                fDay = (new Date()).getDate()

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

                for (let i = thisData.length - 1; i > -1; i--) {
                    if ((new Date(thisData[i].fecha)).getDate() !== fDay) {
                        thisData.splice(i, 1)
                    }
                }

                let expenses = 0, taxes = 0, free = 0

                for (let i = 0; i < thisData.length; i++) {
                    expenses += parseInt(thisData[i].t_grabado)
                    taxes += parseInt(thisData[i].itbis)
                    free += parseInt(thisData[i].t_excento)
                }

                this.$emit('summaryChanged', [expenses, taxes, free, thisData.length])
                this.chartData.datasets[0].data =[expenses, taxes, free]
                this.renderChart(this.chartData, this.options)

            } else if (filter == 'This week') {

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

                    let expenses = 0, taxes = 0, free = 0

                    for (let i = 0; i < thisData.length; i++) {
                        expenses += parseInt(thisData[i].t_grabado)
                        taxes += parseInt(thisData[i].itbis)
                        free += parseInt(thisData[i].t_excento)
                    }

                    this.$emit('summaryChanged', [expenses, taxes, free, thisData.length])
                    this.chartData.datasets[0].data =[expenses, taxes, free]
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

                let expenses = 0, taxes = 0, free = 0

                for (let i = 0; i < thisData.length; i++) {
                    expenses += parseInt(thisData[i].t_grabado)
                    taxes += parseInt(thisData[i].itbis)
                    free += parseInt(thisData[i].t_excento)
                }

                this.$emit('summaryChanged', [expenses, taxes, free, thisData.length])
                this.chartData.datasets[0].data =[expenses, taxes, free]
                this.renderChart(this.chartData, this.options)

            } else if (filter == 'This year') {

                fYear = (new Date()).getFullYear()

                let data = undefined

                for (let i = 0; i < newData.length; i++) {

                    if (newData[i].selector == fYear) {
                        data = newData[i].data
                    }
                }

                let expenses = 0, taxes = 0, free = 0

                for (let i = 0; i < data.length; i++) {
                    expenses += parseInt(data[i].t_grabado)
                    taxes += parseInt(data[i].itbis)
                    free += parseInt(data[i].t_excento)
                }

                this.$emit('summaryChanged', [expenses, taxes, free, data.length])
                this.chartData.datasets[0].data =[expenses, taxes, free]
                this.renderChart(this.chartData, this.options)
            }

            this.firstLoad = false
        },

        getFilter(newFilter) {

            if (!this.firstLoad) { //This is for avoiding the filter watcher to run if it is the first page load

                let fYear = 0, fMonth = 0, fDay = 0

                if (newFilter == 'Today') {

                    fYear = (new Date()).getFullYear()
                    fMonth = (new Date()).getMonth() + 1
                    fDay = (new Date()).getDate()

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

                    for (let i = thisData.length - 1; i > -1; i--) {
                        if ((new Date(thisData[i].fecha)).getDate() !== fDay) {
                            thisData.splice(i, 1)
                        }
                    }

                    let expenses = 0, taxes = 0, free = 0

                    for (let i = 0; i < thisData.length; i++) {
                        expenses += parseInt(thisData[i].t_grabado)
                        taxes += parseInt(thisData[i].itbis)
                        free += parseInt(thisData[i].t_excento)
                    }

                    this.$emit('summaryChanged', [expenses, taxes, free, thisData.length])
                    this.chartData.datasets[0].data =[expenses, taxes, free]
                    this.renderChart(this.chartData, this.options)

                } else if (newFilter == 'This week') {

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

                    let expenses = 0, taxes = 0, free = 0

                    for (let i = 0; i < thisData.length; i++) {
                        expenses += parseInt(thisData[i].t_grabado)
                        taxes += parseInt(thisData[i].itbis)
                        free += parseInt(thisData[i].t_excento)
                    }

                    this.$emit('summaryChanged', [expenses, taxes, free, thisData.length])
                    this.chartData.datasets[0].data =[expenses, taxes, free]
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

                    let expenses = 0, taxes = 0, free = 0

                    for (let i = 0; i < thisData.length; i++) {
                        expenses += parseInt(thisData[i].t_grabado)
                        taxes += parseInt(thisData[i].itbis)
                        free += parseInt(thisData[i].t_excento)
                    }

                    this.$emit('summaryChanged', [expenses, taxes, free, thisData.length])
                    this.chartData.datasets[0].data =[expenses, taxes, free]
                    this.renderChart(this.chartData, this.options)

                } else if (newFilter == 'This year') {

                    fYear = (new Date()).getFullYear()

                    let data = undefined

                    for (let i = 0; i < this.myData.length; i++) {

                        if (this.myData[i].selector == fYear) {
                            data = this.myData[i].data
                        }
                    }

                    let expenses = 0, taxes = 0, free = 0

                    for (let i = 0; i < data.length; i++) {
                        expenses += parseInt(data[i].t_grabado)
                        taxes += parseInt(data[i].itbis)
                        free += parseInt(data[i].t_excento)
                    }

                    this.$emit('summaryChanged', [expenses, taxes, free, data.length])
                    this.chartData.datasets[0].data =[expenses, taxes, free]
                    this.renderChart(this.chartData, this.options)
                }
            }
        },

        cMode(newVal) {

            if (newVal == true) {
                this.chartData.datasets[0].backgroundColor = ['rgba(50, 50, 150, 0.85)',
                                        'rgba(50, 50, 150, 0.55)',
                                        'rgba(50, 50, 150, 0.35)']
                this.renderChart(this.chartData, this.options)
            } else {
                this.chartData.datasets[0].backgroundColor = ['rgba(205, 205, 205, 0.95)',
                                        'rgba(205, 205, 205, 0.65)',
                                        'rgba(205, 205, 205, 0.45)']
                this.renderChart(this.chartData, this.options)
          }
        }
    },

    data() {
        return {

            chartData: {
                labels: ["Expenses", "Taxes", "Taxes free"],

                datasets: [{
                    label: "Label",
                    data: [],

                    borderWidth: 1,
                    backgroundColor: ['rgba(50, 50, 150, 0.85)',
                                    'rgba(50, 50, 150, 0.55)',
                                    'rgba(50, 50, 150, 0.35)'],
                    borderColor: 'rgba(50, 50, 150, 0.85)'
                }]

            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                
                legend: {
                    display: false
                },

                scales: {

                    xAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            drawOnCharArea: false,
                            zeroLineColor: 'rgba(0, 0, 0, 0)'
                        },
                        ticks: {
                            beginAtZero: false,
                            display: false
                        },

                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            zeroLineColor: 'rgba(0, 0, 0, 0)'
                        },
                        
                        ticks: {
                            beginAtZero: false,
                            display: false,
                        },

                    }]
                }

            },
            firstLoad: true
        }

    }
}

</script>

<style>


</style>