<style scoped>
    @import 'keepcalmfont.css';
</style>

<template>
    
    <html>


        <head>
            


        </head>

        <body>
            
            <p class="paragraph"> Enter your stock ticker</p>


            <input type="text" name="stockTicker1" v-model="stockTicker" />
            <br><br>
            <button type="button" class="button" v-on:click="getCurrentPrice()" ><img src="../assets/gradient_buttons/get_market_data.png" width="138" height="38" color="transparent" alt="Create Account"></button>
            <br><br>
            <p class="paragraph">The current price of {{stockTicker.toUpperCase()}} is {{currentPrice}}</p>
            <br><br>
 

            <div id="stockchart">

            <canvas id="myChart" width="400" height="400"></canvas>


            </div>
            <div>
               
            </div>
                
            <div id="chart" class="container">
                <div class="row mt-5" v-if="arrClose.length > 0">
                    <div class="col">
                        <h2 class="text-center">AAPL Chart Graph</h2>
                        
                    </div>
                </div>
            </div>
            

        </body>
    


    </html>




</template>


<script>
import BarChart from '/src/components/barChart.vue';

import axios from 'axios';
import moment from 'moment';

export default {
    name: "chart",
    components: {
        BarChart,
    },
    data(){
        return{
            stockTicker: '',
            currentPrice: '',

            arrClose: [],
            closeChartColors: {
                borderColor: "#077187",
                pointBorderColor: "#0E1428",
                pointBackgroundColor: "#AFD6AC",
                backgroundColor: "#74A57F"
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }        
        };
    },
    async created() {
        //const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"

        const { data } = await axios.get("https://api.tdameritrade.com/v1/marketdata/AAPL/pricehistory?apikey=TILH8USQQOGPD8OQWLDV033FIOBDENMY");

        data.candles.forEach(d => {
            const date = 1; //moment(d.date, "YYYYMMDD").format("MM/DD");
            const {
                close,
            } = d;

            this.arrClose.push({ date, total: close });
            
        });
    },
    methods:{
        async getCurrentPrice(){
            const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"
            //need to build URL
            var url = "https://api.tdameritrade.com/v1/marketdata/"
            console.log(this.stockTicker)
            
            if(this.stockTicker.length > 4){
                swal('Please enter a valid stock ticker!')
                return
            }

            url += (this.stockTicker + '/quotes?apikey=' + apikey)
            console.log(url)


            const headers = {}

            var res = await fetch(url, {headers});

            if (!res.ok){
                swal('There was an error with your request! Please try again.')
            }

            var data = await res.json()

            console.log(data[this.stockTicker.toUpperCase()])
            this.currentPrice = data[this.stockTicker.toUpperCase()].askPrice
        }
    },

}
</script>
