<script>

import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,

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


    data() {
        return {

            chartData: {
                labels: [],

                datasets: [{
                    label: "Items",
                    data: [],

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
                            drawOnCharArea: false,
                            zeroLineColor: 'rgba(0, 0, 0, 0)'
                        },

                        
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            zeroLineColor: 'rgba(150, 150, 150, 1)'
                        },
                        
                        ticks: {
                            beginAtZero: true,
                            display: false,
                        }
                       

                    }]
                }

            }
        }
    },

        computed: {

        cMode() {
            return this.$store.getters.modeGetter
        },

        myData() {
            return this.$store.getters.chartsGetter
        }

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

        myData(newData) {

                let fYear = (new Date()).getFullYear()
                let fMonth = (new Date()).getMonth() + 1
                let fDay = (new Date()).getDate()

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
                this.chartData.datasets[0].data = catsVal
                this.$emit('Changed', thisData.length)
                this.renderChart(this.chartData, this.options)
        }

    }

}

</script>

<style>


</style>