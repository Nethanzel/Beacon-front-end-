<script>

import { Line } from 'vue-chartjs'

export default {
    extends: Line,

    mounted() {
        if (this.cMode == true) {
            this.chartData.datasets[0].borderColor = '#012faf'
            this.chartData.datasets[0].pointBackgroundColor = '#012faf'
            this.renderChart(this.chartData, this.options)
        } else {
            this.chartData.datasets[0].borderColor = '#fff'
            this.chartData.datasets[0].pointBackgroundColor = '#012faf'
            this.renderChart(this.chartData, this.options)
        }
    },

    computed: {

        myData() {
            return this.$store.getters.chartsGetter
        },

        cMode() {
            return this.$store.getters.modeGetter
        }
    },

    watch: {
        myData(newData) {

            let tYear = 0, lYear = 0

            tYear = (new Date()).getFullYear()
            lYear = tYear - 1

            let tData  = undefined
            let lData = undefined

            for (let i = 0; i < newData.length; i++) {
                if (newData[i].selector == tYear) { //Gets this year data
                    tData = newData[i].data
                }

                if (newData[i].selector == lYear) { //gets last year data
                    lData = newData[i].data
                }
            }

            let tYearRange = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            let lYearRange = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

            for (let i = 0; i < tData.length; i++) { //Runs over this year data
                tYearRange[(new Date(tData[i].fecha)).getMonth()] += parseInt(tData[i].t_facturado)
            }

            for (let i = 0; i < lData.length; i++) { //Runs over last year data
                lYearRange[(new Date(lData[i].fecha)).getMonth()] += parseInt(lData[i].t_facturado)
            }

            this.$emit('linesChanged', [tData.length, lData.length])
            this.chartData.datasets[0].data = tYearRange
            this.chartData.datasets[1].data = lYearRange
            this.renderChart(this.chartData, this.options)
        },

        cMode(newVal) {

            if (newVal == true) {
                this.chartData.datasets[0].borderColor = '#012faf'
                this.chartData.datasets[0].pointBackgroundColor = '#012faf'
                this.renderChart(this.chartData, this.options)
            } else {
                this.chartData.datasets[0].borderColor = '#fff'
                this.chartData.datasets[0].pointBackgroundColor = '#012faf'
                this.renderChart(this.chartData, this.options)
            }
        }
    },

    data() {
        return {

            chartData: {
                labels: ["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

                datasets: [{
                    label: "This year",
                    backgroundColor: "transparent",
                    borderColor: "#012faf",
                    pointBackgroundColor: "#012faf",
                    data: [],
                    borderWidth: 1.5,
                    pointRadius: 2


                },
                {
                    label: "Last year",
                    backgroundColor: "transparent",
                    borderColor: "#918f8f",
                    pointBackgroundColor: "#918f8f",
                    data: [],
                    borderDash: [8, 5],
                    borderWidth: 1.5,
                    pointRadius: 2

                }]

            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                layout: {
                    padding: {
                        top: 5
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            drawOnCharArea: false,
                            zeroLineColor: 'rgba(0, 0, 0, 0)'
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(0, 0, 0, 0)',
                            zeroLineColor: 'rgba(150, 150, 150, 1)'
                        },
                        ticks: {
                            display: false,
                            min: 0
                        }
                    }]
                }

            }
        }
    }
}

</script>

<style>


</style>