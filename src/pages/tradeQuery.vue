<script>

export default {
    name: 'trade',
    props: {
        msg: String
    },
    data() {
        return {
            foobar: null,
            url: '',
            loaded:'',
            stock: '',
            stockprice: '',
            volume: '',
        }
    },

    methods: {

        updateInfo() {
            this.$router.push('/tradeUpdate');
        },
        async placeTrade() {

            var res = await fetch(url, {headers});

            if (!res.ok){
                swal('There was an error with your request! Please try again.')
            }
        },
        stockPrice() {
            this.url = 'https://financialmodelingprep.com/api/v3/stock/real-time-price/' 
            + this.stock + '?apikey=0405b999b382887c98252f96982e18d0'
            axios.get(this.url)
            .then( response => {
                this.stockprice = response.data.price,
                console.log(this.stockprice)
            })
            .catch( err => console.log(err))
        },
        formatNumber(number) {
            number = (number/1000000).toFixed(2).replace('.',',')
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        updateStock() {
            this.url = 'https://financialmodelingprep.com/api/v3/stock/real-time-price/' 
            + this.stock + '?apikey=0405b999b382887c98252f96982e18d0'
            console.log(this.url)
            axios.get(this.url)
            .then( response => {
                this.stockPrice()
            })
            .catch (err => console.log(err))
        }
        
    }
}

//TradingView widget library, does not want to resolve dependencies. Gotta figure it out.
/*import VueTradingView from 'vue-trading-view/src/vue-trading-view.vue';

export default {
    name: 'ChartWidget',
    props: {
        msg: String
    },
    components: {
        VueTradingView,
    }
} */


</script>

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
            <span style="font-size: 30px;"> SPY</span>
        </h1>
        <form @submit.prevent="updateInfo">
            <input type="submit" value="Submit" class="btn-primary m-2">
            <input type="text" v-model="stock" name="stock" placeholder="Enter Ticker">
        </form>
        <div class="container">
            <!--{{this.stock}}-->
            <div class="stock_name"> {{stockprice}}</div>
        </div>

        <div class="row" v-if="loaded">

        <div class="col-md-5 ml-5">
            <b-table sticky-header hover :items="items" :fields="fields"></b-table>
        </div>

    </div>

    <div id="about-stock-container">
        <img src="../assets/main_screen/aboutStockPlaceholder.png"
        alt="About-Stock-Backdrop"
        style="width:57%;"
        >
        <!--div class="centered">Will pull stock info to go here</div-->
    </div>

    <div id="performance-container">
        <img src="../assets/main_screen/performance placeholder.png"
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
        <img src="../assets/main_screen/s_p stock purchase card.png"
        alt="Card-Box"
        style="width:16%;"
        >
    </div>

    <div id="new-trade-button">
        <aside class="button">
            <img 
            @mouseenter="imagePopup"
            @moustleave="imagePopdown"
            src="../assets/gradient_buttons/new_trade_button.png"
            alt="NewTrade-button"
            style="width:20%;"
            >
        </aside>
    </div>

    <div id="place-trade-button">
        <button type="button" class="button" v-on:click.native="placeTrade()"><img src="../assets/gradient_buttons/place_trade_button.png"
        alt="NewTrade-button"
        style="width:70%;"
        ></button>

    </div>

    <div id="trade-info-container">
        <img src="../assets/main_screen/tradeInfoSPY.png"
        alt="Trade-Info"
        style="width:40%;"
        >
    </div>

</div>

</div>
</main>        
</template>



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
    top: -760px;
    left: 220px;
    margin: 0 auto;
}
/* Container holding Place Trade Button */
#place-trade-button {
    position: relative;
    top: -860px;
    left: 443px;
    margin: 0 auto;
}
/* Container holding Trade Info Box */
#trade-info-container {
    position: relative;
    top: -850px;
    left: 350px;
    margin: 0 auto;
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

