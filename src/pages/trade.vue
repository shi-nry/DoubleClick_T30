<style scoped>
    @import 'keepcalmfont.css';
</style>

<!-- This file hosts the trade page of the web application -->
<!-- Still needs to display chart -->
<!-- This file was worked on by Henry Shi -->

<template>
<main>
<div id="box8">
     <div id="wrapper" v-if="loggedin===true && hasPreferences===true">
    
        <div id="box9">
        <h2 class="trade_stats" style="color: rgb(36, 141, 206);">About This Stock:</h2>
        <div class="description">
             {{companyDescription}}
        </div>
        </div>

        <div id="box10">
            
                
                <div class="schart" :key="chartKey">
                    <VueTradingView :options="{
                        symbol: exchangeTicker,
                        width: '100%',
                        height: '100%',
                        theme: 'light',
                        interval: '60',
                        timezone: 'America/Los_Angeles',
                        save_image: 'false',
                        style: '2',
                        hide_legend: 'true',
                    }" />
                </div>
            
        </div>

        <div id="box11">
            <h2 style="color: rgb(36, 141, 206);" class="trade_stats">Trade Information:</h2>
            <h2 class="trade_substats">Current Ticker Price: {{displayPrice.toLocaleString('en', {useGrouping:true})}}</h2>
            <h2 class="trade_substats">Day's Volume: {{dayVolume.toLocaleString('en', {useGrouping:true})}}</h2>
            <h2 class="trade_substats">Market Cap: {{marketCap.toLocaleString('en', {useGrouping:true})}}</h2>
            <h2 class="trade_substats">User Indicated Desired Position Length: {{holdTime.toUpperCase().toLocaleString('en', {useGrouping:true})}}</h2>
                
        </div>

        <div id="box12">
        <h2 style="color: rgb(36, 141, 206);" class="trade_stats">Trade Suggestion:</h2>

            <div v-if="tickerSuggestion">
                    <h2 class="suggestion_text">Your recommended trade is {{tickerSuggestion}}</h2>


                    <h2 class="suggestion_text">The 52 week high for {{tickerSuggestion}} is {{yearHigh}}
                        and the 52 week low is {{yearLow}} </h2>

                    
                    <div v-if="companyCategory">
                        
                        <h2 class="suggestion_text">{{homepageURL}}</h2>                       

                        <h2 class="suggestion_text">Company Category:</h2>
                        
                        <h2 class="suggestion_text">{{companyCategory}}</h2>
                    </div>
            </div>
            <div class="description" v-else>
                 Please click the "New Trade" button to be shown information! 
            </div>
            
            <div id="new-trade-button">
                    <button class="button" v-on:click="suggestStock()">
                        <img src="../assets/gradient_buttons/new_trade_button.png"
                        alt="NewTrade-button" 
                        style="width:250px;"
                        >
                    </button>
                </div>

                <div id="place-trade-button">
                    <button class="button" v-on:click="swalDecision()">
                        <img src="../assets/gradient_buttons/place_trade_button.png"
                        alt="NewTrade-button"
                        style="width:250px;"
                        >
                    </button>
                </div>
              
        </div>

           <div id="box13">
            <div id="trade-text">
                <h2>
                    <span>Trade </span>
                    <span style="font-size: 40px; color: rgb(36, 141, 206);"> {{stockTicker.toUpperCase()}}</span>
                </h2>
                    
            </div>

                <div id="box6" class="position_text">
                    <h2 class="position_text">Available funds: ${{cashMoney.toFixed(2)}}</h2>
                </div>

                
                <input class="searchbox" type="text" v-model="stockTicker" name="stock" placeholder="Enter Ticker (like AAPL or TSLA...)">
                <button id="searchbox" class="button" v-on:click="updateInfo()" value="Search Ticker" > 
                    <img src="../assets/gradient_buttons/search.png"
                        alt="Search-Button"
                        style="width:205px; height:55px;"
                    >
                </button>
                

               
                <input type="number" class="desired" v-model="shares" name="shares" placeholder="Enter Desired Shares" min="1">
              

                

           </div>
            <!--div id="trade">
                <span style="font-size: 50px; color: #099ba3;">Trade</span>
                <span style="font-size: 30px;"> SPY</span>
            </div-->
            
            
            
                
                <!--<div>
                    <br>
                    <button class="button">
                        <img src="../assets/gradient_buttons/suggest_stock.png"
                        alt="suggestStock" v-on:click="suggestStock()" style="width:200px" />
                    </button>
                    <br><br>
                    <input type="number" v-model="shares" name="shares" placeholder="Enter Desired Shares" min="1">
                </div-->
               

                


                <!--
                    
                <div id="box7">
                <div v-if="tickerSuggestion">
                    <h2 class="suggestion_text">Your recommended trade is {{tickerSuggestion}}</h2>


                    <h2 class="suggestion_text">The 52 week high for {{tickerSuggestion}} is {{yearHigh}}
                        and the 52 week low is {{yearLow}} </h2>

                    
                    <div v-if="companyCategory">
                        
                        <p class="suggestion_text">{{homepageURL}}</p>
                        <br><br>

                        <p class="suggestion_text">Company Category:</p>
                        
                        <p class="suggestion_text">{{companyCategory}}</p>
                    </div>
                </div>    

                </div>-->
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
            <!--    
            <div id="about-stock-container">
                <img src="../assets/main_screen/About This Stock_.png"
                alt="About-Stock-Backdrop"
                style="width:57%;"
                >
                <div class="description"> {{companyDescription}}</div>
                div class="centered">Will pull stock info to go here</div
            </div>
            -->
            

            <!--div id="card1-container">
                <img src="../assets/tradeAssets/suggest_card.png"
                    style="width:16%;"
                >
            </div>

            <div id="card2-container">
                <img src="../assets/tradeAssets/lohi_card.png"
                alt="card2"
                style="width:15%;"
                >
            </div-->
            <!--
            <div id="new-trade-button">
                <button class="button" v-on:click="suggestStock()">
                    <img src="../assets/gradient_buttons/new_trade_button.png"
                    alt="NewTrade-button" 
                    style="width:250px;"
                    >
                </button>
            </div>

            <div id="place-trade-button">
                <button class="button" v-on:click="placeTrade()">
                <img src="../assets/gradient_buttons/place_trade_button.png"
                alt="NewTrade-button"
                style="width:250px;"
                
                ></button>

            </div-->
            
            <!--
            <div id="trade-info-container">
                <img src="../assets/main_screen/tradeInfoBlank.png"
                alt="Trade-Info"
                style="width:40%;"
                >
                <div class="price-text"> {{displayPrice.toLocaleString('en', {useGrouping:true})}}</div>
                <div class="volume-text"> {{dayVolume.toLocaleString('en', {useGrouping:true})}}</div>
                <div class="marketcap-text"> {{marketCap.toLocaleString('en', {useGrouping:true})}}</div>
            </div>
            -->

        
    </div>

    <div v-else-if="loggedin===false">
        <div id="box1">
            <h2> Please log in to view this page! </h2>
        </div>

    </div>

    <div v-else-if="loggedin===true && hasPreferences===false"> 
        <div id="box1">
            <h2> Please navigate to preferences and set up your account! </h2>
        </div>

    </div>
</div>

</main>        
</template>

<script>
import {getAuth} from "firebase/auth";
import stockChart from '/src/components/stockChart.vue'
import VueTradingView from 'vue-trading-view/src/vue-trading-view.vue';


export default {
    name: "trade",
    components: {VueTradingView},
    
    data()
    {
        return {
            /**cards
            cards : [
                {
                url : "../assets/main_screen/discard pile base.png",
                name: "card1"
                }
            ],**/

            //card1: "../assets/main_screen/discard pile base.png",

            //single variables
            stockTicker: '',
            currentPrice: '',
            displayPrice: 'N/A',
            dayVolume: 'N/A',
            loggedin: '',
            userId: '',
            shares: '',
            hasPreferences: '',
            exchangeString: '',

            //chart vars
            exchangeTicker: '',
            chartKey: 0,

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
            companyDescription: 'Please search for a stock or hit the "New Trade" button for stock info!',
            companyCategory: '',
            marketCap: 'N/A',
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
        //this.card1 = "../assets/main_screen/discard pile base.png"
        this.exchangeTicker = 'poopoo';
        this.chartKey += 1;
    },

    methods:{
        async swalDecision(){
            swal("Are you sure you want to place this trade?", {
              dangermode: true,
              buttons: {
                no: "No",
                yes: "Yes"
              }
            })
            .then((value) => {
              if(value == 'yes'){
                console.log('hell fuckin yea')
                this.placeTrade()
              }
              if(value == 'no'){
                console.log('aw hell naw')
              }
            })
        },

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
                if(longTermGain > 40 && this.holdTime == 'long'){
                    matchesHoldTime = true
                }
                if(shortTermGain > 10 && this.holdTime == 'short'){
                    matchesHoldTime = true
                }

                
                //console.log(ticker)
                
                if(matchesRiskTolerance && matchesDividendPreference && matchesHoldTime){
                    console.log(ticker)
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
            console.log(this.shares)
            if(!this.stockTicker){
                swal('Please Enter a Valid Stock Ticker!')
                return
            }
            if(parseFloat(totalTradeCost) < parseFloat(this.cashMoney) && this.shares > 0){
                
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
            } else if(parseFloat(totalTradeCost) > parseFloat(this.cashMoney)) {
                swal('Sorry, You Don\'t Have Enough Funds to Place This Trade!')
            } else {
                swal('Please Enter a Valid Amount of Shares to Purchase')
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
            this.exchangeString = data[this.stockTicker.toUpperCase()].exchangeName
            this.displayPrice = '$' + data[this.stockTicker.toUpperCase()].askPrice

            if (this.exchangeString == 'NYSE') {
                this.exchangeTicker = 'NYSE:' + this.stockTicker;
            }
            else if (this.exchangeString == 'NASD') {
                this.exchangeTicker = 'NASDAQ:' + this.stockTicker;
            }
            this.chartKey += 1;

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
            this.homepageURL = data.results.homepage_url

        },

        //update cards
        updateCards: function (){
            document.getElementById('card1').src="../assets/tradeAssets/suggest_card.png";
            document.getElementById('card2').src="../assets/tradeAssets/lohi_card.png";
        },
    }

}

</script>

<style scoped>
/*@import 'keepcalmfont.css';*/

form input[type=submit] {
    background: url("../assets/gradient_buttons/search.png") 
        no-repeat center center;
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    z-index: 100;
      color: transparent;
}

#trade-text {
    position: absolute;
    top: -4%;
    left: 4%;
    margin: auto;
    font-size: 30px;
    padding: none;
}

#share-box {
    position: absolute;
    top: 10%;
    left: -11%;
    width:80%;
    margin: auto;
    padding:none;
}

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

/* Container holding Discard Box */
#card1-container {
    position: relative;
    top: -515px;
    left: 220px;
    margin: 0 auto;
}
/* Container holding Stock Card Box */
#card2-container {
    position: relative;
    top: -744px;
    left: 443px;
    margin: 0 auto;
}
/* Container holding New Trade Button */
#new-trade-button {
    position: absolute;
    width: 250px;
    height: 100px;
    top: 65%;
    left: 0%;
    margin: auto;
    padding-right: 20%;
    
}
/* Container holding Place Trade Button */
#place-trade-button {
    position: absolute;
    width: 250px;
    height: 100px;
    top: 64.6%;
    right:1%;
    margin: auto;
    padding-right: 20%;
}
/* Container holding Trade Info Box */
#trade-info-container {
    position: relative;
    top: -360px;
    left: 350px;
    margin: 0 auto;
    color: teal
}

/* Button class */
.button {
    width: 200px;
    height: 100px;
    border: none;
    background-color: transparent;
    /*background-size: 100%;*/
    outline: none;
    cursor: pointer;
    padding: none;
    z-index: 100;
        color: transparent;
}


/* Centered text */
.description {
    font-size: 18px;
    position: center;



    overflow-wrap: break-word;
}

.price-text {
    font-size: 30px;
    position: absolute;
    top: 37%;
    left: 57%;
    transform: translate(-50%, -50%);
    inline-size: 500px;
    overflow-wrap: break-word;
}

.volume-text {
    font-size: 30px;
    position: absolute;
    top: 54%;
    left: 52%;
    transform: translate(-50%, -50%);
    inline-size: 500px;
    overflow-wrap: break-word;
}

.marketcap-text {
    font-size: 30px;
    position: absolute;
    top: 72%;
    left: 55%;
    transform: translate(-50%, -50%);
    inline-size: 500px;
    overflow-wrap: break-word;
}

</style>

