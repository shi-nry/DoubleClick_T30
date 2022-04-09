<!-- This file hosts the trade page of the web application -->
<!-- Still needs to display chart -->
<!-- This file was worked on by Henry Shi -->

<template>
<main>

<div id="wrapper">
    <!--div id="trade">
        <span style="font-size: 50px; color: #099ba3;">Trade</span>
        <span style="font-size: 30px;"> SPY</span>
    </div-->

    <div id="trade-function">
        <h1>
            <span style="font-size: 50px; color: #099ba3;">Trade</span>
            {{this.stockTicker.toUpperCase()}}
        </h1>
        <form @submit.prevent="updateInfo">
            <input type="text" v-model="stockTicker" name="stock" placeholder="Enter Ticker">
            <input type="submit" value="Submit">
        </form>
       
        <div class="row" v-if="loaded">

        <div class="col-md-5 ml-5">
            <b-table sticky-header hover :items="items" :fields="fields"></b-table>
        </div>

    </div> 

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
        <div class="centered"> ${{currentPrice}}</div>
        <div class="centered"> {{dayVolume}}</div>
        <div class="centered"> {{marketCap}}</div>
    </div>

</div>


</div>
</main>        
</template>

<script>
export default {
    name: "trade",
    beforeCreate()
    {
        //Vue.LoadScript("https://cdn.jsdelivr.net/npm/chart.js")
    },
    data()
    {
        return {
            //single variables
            stockTicker: '',
            aboutStock: '',
            currentPrice: '',
            dayVolume: '',
            loggedin: true,
            userId: '',
            shares: '',

            //single polygon api vars
            companyDescription: '',
            companyCategory: '',
            marketCap: '',
            
        }
    },

    props:{
        
    },
    /*
    created: function(){
        this.currentPositions.set('testkey','testvalue')
    },
    */
    methods:{

        async placeTrade(){
            var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/Position.json'
            var headers = {}

            //hardcoding testUserId will need to be changed later
            this.userId = 'testUserId'

            var body = {
                shares: this.shares,
                ticker: this.stockTicker,
                tradePrice: this.currentPrice,
                userId: this.userId
            }
            body = JSON.stringify(body)
            
            var res = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            })

            var data = await res.json()
            console.log(data)

        },


        //method to get stock price
        async updateInfo(){
            //For TD api
            const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"
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
            this.dayVolume = data[this.stockTicker.toUpperCase()].totalVolume
            this.aboutStock = data[this.stockTicker.toUpperCase()].description

            this.getStockInfo(this.stockTicker.toUpperCase())

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
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
}

</style>

