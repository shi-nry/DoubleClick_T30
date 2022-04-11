<!-- This file hosts the trade page of the web application -->
<!-- Still needs to display chart -->
<!-- This file was worked on by Henry Shi -->

<template>
<main>
<div>
     <div id="wrapper" v-if="loggedin===true && hasPreferences===true">
            <!--div id="trade">
                <span style="font-size: 50px; color: #099ba3;">Trade</span>
                <span style="font-size: 30px;"> SPY</span>
            </div-->

            <div id="trade-function">
                <h1>
                    <span style="font-size: 50px; color: #099ba3;">Trade</span>

                    {{stockTicker.toUpperCase()}}
                </h1>
                <form @submit.prevent="updateInfo">
                    <input type="text" v-model="stockTicker" name="stock" placeholder="Enter Ticker">
                    <input type="submit" value="Search Ticker">
                </form>
                <div>
                    <br>
                    <input type="submit" value="suggestStock" v-on:click="suggestStock()">
                    <br><br>
                    <input type="number" v-model="shares" name="shares" placeholder="Enter Desired Shares" min="1">
                </div>
                <div>
                    <br>
                    Available funds: ${{this.cashMoney}}
                </div>

                <div v-if="tickerSuggestion">

                    <p class="white_subheader">Your recommended trade is {{tickerSuggestion}}</p>


                    <p class="white_subheader">The 52 week high for {{tickerSuggestion}} is {{yearHigh}}
                        and the 52 week low is {{yearLow}} </p>


                    <div v-if="companyCategory">
                        
                        <p class="paragraph">{{homepageURL}}</p>
                        <br><br>

                        <p class="white_subheader">Company Category:</p>
                        
                        <p class="paragraph">{{companyCategory}}</p>

                        
                    </div>

                    <br><br><br>

                </div>
            <!--
                <div class="row" v-if="loaded">

                    <div class="col-md-5 ml-5">
                        <b-table sticky-header hover :items="items" :fields="fields"></b-table>
                    </div>

                </div> 
            -->
            <!--div id="trade">
                <h1>
                    <span style="font-size: 50px; color: #099ba3;">Trade</span>
                        {{ info }}
                </h1>
            </div-->
                
            <div id="about-stock-container">
                <img src="../assets/main_screen/About This Stock_.png"
                alt="About-Stock-Backdrop"
                style="width:57%;"
                >
                <div class="centered"> {{companyDescription}}</div>
                <!--div class="centered">Will pull stock info to go here</div-->
            </div>

            <div id="performance-container">
                <img src="../assets/main_screen/Today’s Stock Performance_.png"
                alt="Performance-Backdrop"
                style="width:57%;"
                >
            </div>

            <div id="discard-container">
                <img src="../assets/main_screen/discard pile base.png"
                alt="Discard-Box"
                style="width:15%;"
                >
            </div>

            <div id="card-container">
                <img src="../assets/main_screen/discard pile base.png"
                alt="Card-Box"
                style="width:15%;"
                >
            </div>

            <div id="new-trade-button">
                <button type="button" class="button" v-on:click="getCurrentPrice()">
                    <img src="../assets/gradient_buttons/new_trade_button.png"
                    alt="NewTrade-button"
                    style="width:70%;"
                    >
                </button>
            </div>

            <div id="place-trade-button">
                <button type="button" class="button" v-on:click.native="placeTrade()">
                <img src="../assets/gradient_buttons/place_trade_button.png"
                alt="NewTrade-button"
                style="width:70%;"
                ></button>

            </div>

            <div id="trade-info-container">
                <img src="../assets/main_screen/tradeInfoBlank.png"
                alt="Trade-Info"
                style="width:40%;"
                >
                <div class="price-text"> ${{currentPrice.toLocaleString('en', {useGrouping:true})}}</div>
                <div class="volume-text"> {{dayVolume.toLocaleString('en', {useGrouping:true})}}</div>
                <div class="marketcap-text"> {{marketCap.toLocaleString('en', {useGrouping:true})}}</div>
            </div>

        </div>
    </div>

    <div v-else-if="loggedin===false">
        <div>
            <h2> Please log in to view this page! </h2>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>

    </div>

    <div v-else-if="loggedin===true && hasPreferences===false"> 
        <div>
            <h2> Please navigate to preferences and set up your account! </h2>
        </div>

    </div>
</div>


</main>        
</template>

<script>
import {getAuth} from "firebase/auth";

export default {
    name: "trade",
    data()
    {
        return {
            //single variables
            stockTicker: '',
            currentPrice: '',
            dayVolume: '',
            loggedin: '',
            userId: '',
            shares: '',
            hasPreferences: '',

            riskLevel: '',
            tickerSuggestion: '',
            closePrice: '',
            yearHigh: '',
            yearLow: '',
            peRatio: '',
            volatility: '',
            description: '',
            

            variable: '',
            dividendYield: '',
            longTermGain: '',
            shortTermGain: '',

            tickerObj: {},
            tickerSuggestionArray: [],
            suggestionCounter: '',

            //single polygon api vars
            homepageURL: '',


            //database user variables
            userPostId: '',
            cashMoney: '',
            dividendImportance: '',
            holdTime: '',
            riskTolerance: '',
            



            //single polygon api vars
            companyDescription: '',
            companyCategory: '',
            marketCap: '',
            homepageURL: '',
            
        }
    },

    created(){

        const auth = getAuth();
        try{
            this.userId = auth.currentUser.uid;
            this.loggedin = true;
            console.log('logged in with ' + this.userId);
        }catch(error){
            this.userId = '';
            this.loggedin = false;
            console.log('not logged in');
        }
        
        

    },

    async beforeMount(){

        await this.getUserInfo();
        await this.getStocksfromDB();

        this.getStockSuggestions();
        this.suggestionCounter = 0;
    },

    methods:{

        async getStocksfromDB(){
            var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/Ticker.json'
            var headers = {}
            var response = await fetch(url, {headers})
            var data = await response.json()
            console.log(data)

            this.tickerObj = data
        },

        async suggestStock(){

            if(this.tickerSuggestionArray[this.suggestionCounter]){

                this.tickerSuggestion = this.tickerSuggestionArray[this.suggestionCounter]
                this.stockTicker = this.tickerSuggestion
            }else{
                swal('You have run out of trade suggestions for your preferences!')
            }
            this.updateInfo()
            
            this.tickerSuggestionArray.splice(0, 1)

        },


        getStockSuggestions(){


            for(let ticker in this.tickerObj){

                var dividendYield = this.tickerObj[ticker].dividendYield
                var longTermGain = this.tickerObj[ticker].longTermGain
                var shortTermGain = this.tickerObj[ticker].shortTermGain
                var isVariable = this.tickerObj[ticker].variable

                var risk 
                if(this.riskTolerance == 'low'){
                    risk = false
                } else {
                    risk = true
                }
                
                var dividendDesignation  
                if(dividendYield <= 3){
                    dividendDesignation = 'low'
                }else if(dividendYield > 3){
                    dividendDesignation = 'high'
                }
                if(this.dividendImportance == 'none'){
                    dividendDesignation = 'none'
                }



                //assign variables to match risk tolerance
                var matchesDividendPreference = false
                var matchesRiskTolerance = false
                var matchesHoldTime = false
                if(this.dividendImportance == dividendDesignation){
                    matchesDividendPreference = true
                }
                if(isVariable == risk){
                    matchesRiskTolerance = true
                }
                if(longTermGain > 20 && this.holdTime == 'long'){
                    matchesHoldTime = true
                }
                if(shortTermGain > 10 && this.holdTime == 'short'){
                    matchesHoldTime = true
                }

                console.log(ticker)
                console.log(matchesHoldTime)
                console.log(matchesDividendPreference)
                console.log(matchesRiskTolerance)

                if(matchesRiskTolerance && matchesDividendPreference && matchesHoldTime){
                    this.tickerSuggestionArray.push(ticker)
                }

            }

            console.log(this.tickerSuggestionArray)


        },

        async getUserInfo(){
            var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/User.json'
            var headers = {}
            var response = await fetch(url, {headers})
            var data = await response.json()
            console.log(data)

            for(let key in data){
                data[key].id = key

                
                //only show positions for current logged in user
                if(data[key].userId === this.userId){
                    console.log(data[key].cashMoney)
                    this.cashMoney = data[key].cashMoney
                    console.log(this.cashMoney)
                    this.userPostId = data[key].id

                    if(data[key].dividendImportance && data[key].holdTime && data[key].riskTolerance){
                        this.dividendImportance = data[key].dividendImportance
                        this.holdTime = data[key].holdTime
                        this.riskTolerance = data[key].riskTolerance
                        this.hasPreferences = true
                    }else{
                        this.dividendImportance = null
                        this.holdTime = null
                        this.riskTolerance = null
                        this.hasPreferences = false
                    }
                    console.log(this.dividendImportance)
                    console.log(this.holdTime)
                    console.log(this.riskTolerance)

                }
            }

        },

        async placeTrade(){
            var totalTradeCost = parseFloat(this.currentPrice * this.shares)
            console.log(totalTradeCost)
            console.log(this.cashMoney)
            console.log(parseFloat(this.cashMoney))
            console.log(parseFloat(totalTradeCost) > parseFloat(this.cashMoney))
            if(parseFloat(totalTradeCost) < parseFloat(this.cashMoney)){
                
                //first post position to DB
                var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/Position.json'
                var headers = {}

                var body = {
                    shares: this.shares,
                    ticker: this.stockTicker.toUpperCase(),
                    tradePrice: this.currentPrice,
                    userId: this.userId,
                    open: true,
                }
                body = JSON.stringify(body)
                
                var res = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: body
                })

                var data = await res.json()
                console.log(data)


                //next update user balance
                this.cashMoney -= parseFloat(totalTradeCost)

                var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/User/' + this.userPostId + '.json'
                var headers = {}

                var body = {
                    cashMoney: this.cashMoney,
                }
                body = JSON.stringify(body)
                
                var res = await fetch(url, {
                    method: 'PATCH',
                    headers: headers,
                    body: body
                })

                var data = await res.json()
                console.log(data)

                swal('Trade Placed Successfully!')
            } else {
                swal('Sorry, You Don\'t Have Enough Funds to Place This Trade!')
            }

        },


        //method to get stock price
        async updateInfo(){
            //For TD api
            const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"
            var url = "https://api.tdameritrade.com/v1/marketdata/"    
            console.log(this.stockTicker)

            if(!this.stockTicker){
                swal('You have run out of trade suggestions for your preferences!')
                return
            }

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
            this.dayVolume = data[this.stockTicker.toUpperCase()].totalVolume
            this.currentPrice = data[this.stockTicker.toUpperCase()].askPrice
            this.closePrice = data[this.stockTicker.toUpperCase()].closePrice
            this.yearLow = data[this.stockTicker.toUpperCase()]['52WkLow']
            this.yearHigh = data[this.stockTicker.toUpperCase()]['52WkHigh']
            this.peRatio = data[this.stockTicker.toUpperCase()].peRatio
            this.volatility = data[this.stockTicker.toUpperCase()].volatility
            this.description = data[this.stockTicker.toUpperCase()].description

            this.getStockInfo()

        },

        //get stock description
        async getStockInfo(){
            const polygonapikey = 'VzIPmrfLaShqiEphpszVpBRVH_DtnwpD'

            var url = 'https://api.polygon.io/v3/reference/tickers/'
            url += (this.stockTicker.toUpperCase() + '?apiKey=' + polygonapikey)
            
            var headers = {}

            var res = await fetch(url, {headers});

            if (!res.ok){
                swal('There was an error fetching company info! Please try again.')
                return
            }

            var data = await res.json()

            console.log('polygonData: ')
            console.log(data)

            this.companyDescription = data.results.description
            this.companyCategory = data.results.sic_description
            this.marketCap = data.results.market_cap

        },
    }
}

</script>

<style scoped>
#trade-function {
    text-align: center;
}

#wrapper {
    width: 1170px;
    margin: 0 auto;
}

/* Container holding about stock image and text */
#about-stock-container {
    position: relative;
    top: 25px;
    left: -10px;
    margin: 0 auto;
    text-align:left;
    color: teal;
}
/* Container holding Stock Performance Chart */
#performance-container {
    position: relative;
    top: 45px;
    left: -10px;
    margin: 0 auto;
    text-align:left;
    color: teal
}
/* Container holding Discard Box */
#discard-container {
    position: relative;
    top: -515px;
    left: 220px;
    margin: 0 auto;
}
/* Container holding Stock Card Box */
#card-container {
    position: relative;
    top: -747px;
    left: 443px;
    margin: 0 auto;
}
/* Container holding New Trade Button */
#new-trade-button {
    position: relative;
    top: -747px;
    left: 220px;
    margin: 0 auto;
}
/* Container holding Place Trade Button */
#place-trade-button {
    position: relative;
    top: -847px;
    left: 443px;
    margin: 0 auto;
}
/* Container holding Trade Info Box */
#trade-info-container {
    position: relative;
    top: -837px;
    left: 350px;
    margin: 0 auto;
    color: teal
}
/* Button class */
.button {
    border: none;
    outline: none;
    padding: 0;
    background: none;
}
/* Centered text */
.centered {
    position: absolute;
    top: 55%;
    left: 27%;
    transform: translate(-50%, -50%);
    inline-size: 550px;
    overflow-wrap: break-word;
}

.price-text {
    font-size: 30px;
    position: absolute;
    top: 35%;
    left: 56%;
    transform: translate(-50%, -50%);
    inline-size: 500px;
    overflow-wrap: break-word;
}

.volume-text {
    font-size: 30px;
    position: absolute;
    top: 53%;
    left: 52%;
    transform: translate(-50%, -50%);
    inline-size: 500px;
    overflow-wrap: break-word;
}

.marketcap-text {
    font-size: 30px;
    position: absolute;
    top: 70%;
    left: 55%;
    transform: translate(-50%, -50%);
    inline-size: 500px;
    overflow-wrap: break-word;
}

</style>

