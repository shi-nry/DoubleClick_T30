

<template>

<div>

Please input your risk tolerance to be suggested a stock 
<br>
<select id="riskLevel" name="riskLevel" v-model="riskLevel" >
    <option value="low risk">low risk</option>
    <option value="medium risk">medium risk</option>
    <option value="high risk">high risks</option>
</select>
<br><br>

<button type="button" v-on:click="suggestStock()" >Suggest Stock</button>
<br><br>

<div v-if="tickerSuggestion">

    Your recommended trade is {{tickerSuggestion}}
    <br>
    {{description}}
    <br>
    The current value is {{currentPrice}} per share

</div>

</div>
    
</template>



<script>
import swal from 'sweetalert';


export default{
    name: 'test2',
    data(){
        return{
            //single variables
            riskLevel: '',
            tickerSuggestion: '',
            stockTicker: '',
            currentPrice: '',
            closePrice: '',
            yearHigh: '',
            yearLow: '',
            peRatio: '',
            volatility: '',
            description: '',


            //arrays
            lowRisks : ['MMM', 'GOOG', 'AMZN', 'AXP', 'AAPL', 'DIS', 'IBM', 'NKE', 'WMT', 'SPY'], //low risk (etfs)
            mediumRisks : ['MMM', 'GOOG', 'AMZN', 'AXP', 'AAPL', 'DIS', 'IBM', 'NKE', 'WMT'], //medium risk (blue chip stocks)
            highRisks : ['BABA', 'ROKU', 'FB', 'NFLX', 'TLRY'], //high risk (low market cap or rough times recently)
        }

    },
    props:
    {
        

    },
    methods:
    {
        //random number gen between min(inclusive) and max(inclusive)
        getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        

        suggestStock(){
            console.log('function called')
            //no selection, no suggestion
            if(this.riskLevel == ''){
                console.log('no risk selected')
                swal('Please select your risk tolerance!')

            } else if(this.riskLevel == 'low risk'){
                console.log('low risk')

                var minsize = 0
                console.log(this.lowRisks)
                console.log(this.lowRisks.length)
                //console.log(lowRisks)
                var maxsize = this.lowRisks.length

                var randomTickerIndex = this.getRandomArbitrary(minsize, maxsize - 1)

                this.tickerSuggestion = this.lowRisks[randomTickerIndex]
                this.stockTicker = this.tickerSuggestion

                this.getQuoteData()
                

            } else if(this.riskLevel == 'medium risk'){
                console.log('medium risk')

                var minsize = 0
                var maxsize = this.mediumRisks.length

                var randomTickerIndex = this.getRandomArbitrary(minsize, maxsize - 1)

                this.tickerSuggestion = this.mediumRisks[randomTickerIndex]
                this.stockTicker = this.tickerSuggestion

                this.getQuoteData()

            } else if(this.riskLevel == 'high risk'){
                console.log('high risk')

                var minsize = 0
                var maxsize = this.highRisks.length

                var randomTickerIndex = this.getRandomArbitrary(minsize, maxsize - 1)

                this.tickerSuggestion = this.highRisks[randomTickerIndex]
                this.stockTicker = this.tickerSuggestion

                this.getQuoteData()


            }


        },

        async getQuoteData(){
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
            
            var headers = {}

            var res = await fetch(url, {headers});

            if (!res.ok){
                swal('There was an error with your request! Please try again.')
            }

            var data = await res.json()

            console.log(data[this.stockTicker.toUpperCase()])
            this.currentPrice = data[this.stockTicker.toUpperCase()].askPrice
            this.closePrice = data[this.stockTicker.toUpperCase()].closePrice
            this.yearLow = data[this.stockTicker.toUpperCase()]['52WkLow']
            this.yearHigh = data[this.stockTicker.toUpperCase()]['52WkHigh']
            this.peRatio = data[this.stockTicker.toUpperCase()].peRatio
            this.volatility = data[this.stockTicker.toUpperCase()].volatility
            this.description = data[this.stockTicker.toUpperCase()].description

            console.log(this.volatility)

        },
    }
}


</script>
