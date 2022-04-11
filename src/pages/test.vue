<style scoped>
    @import 'keepcalmfont.css';
</style>

<template>

<div>

<div  v-if="loggedin===true">

  

  <textarea placeholder="Comment..."></textarea>



<div class="list-choice">
  <div class="list-choice-title">Month</div>
  <div class="list-choice-objects">
    <label>
      <input type="radio" name="month"/>                         <span>January</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>February</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>March</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>April</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>May</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>June</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>July</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>September</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>October</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>November</span>
    </label>
    <label>
      <input type="radio" name="month"/>                         <span>December</span>
    </label>
  </div>
</div>

<p class="white_subheader"> Test Page</p>
    <p class="paragraph"> Enter your stock ticker</p>


    <input type="text" name="stockTicker1" v-model="stockTicker" />
    <br><br>
    <button type="button" class="button" v-on:click="getCurrentPrice()" ><img src="../assets/gradient_buttons/get_market_data.png" width="138" height="38" color="transparent" alt="Create Account"></button>
    <br><br>
    <p class="paragraph">The current price of {{stockTicker.toUpperCase()}} is {{currentPrice}}</p>
    <br><br>
 
    <div v-if="currentPrice">
        <div id="placeTradeButton">
            
            <button type="button">Place Trade</button>

        </div>
    </div>
    <br><br>


   
    <p class="paragraph">Select Query Type</p>
    <select  id="infotype" name="infotype" title="Info Type" v-model="accountquerytype">						    
    <option value="positions">positions</option>
    <option value="orders">orders</option>
    </select>
    <br><br>

    <button type="button" class="button" v-on:click="getTDAccountInfo()" ><img src="../assets/gradient_buttons/get_account_info.png" width="138" height="38" color="transparent" alt="Create Account"></button>
    
    <p class="paragraph">Your Cash Balance is {{cashbalance}}</p>
    



    <p class="paragraph">Your Current Postitions are</p>

</div>

<div v-else-if="loggedin===false">
    <div>
    <h2> Please log in to view this page! </h2>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </div>
    </div>


</div>
</template>


<script>
import {getAuth} from "firebase/auth";
export default {
    name: "test",
    beforeCreate()
    {
        //Vue.LoadScript("https://cdn.jsdelivr.net/npm/chart.js")
    },

    created(){

        const auth = getAuth();
        try{
            this.userid = auth.currentUser.uid;
            this.loggedin = true;
            console.log('logged in with ' + this.userid);
        }catch(error){
            this.userid = '';
            this.loggedin = false;
            console.log('not logged in');
        }
        

    },

    data()
    {
        return {
            //single variables
            stockTicker: '',
            currentPrice: '',
            bearer_token: '',
            testbody: '',
            cashbalance: '',
            accountquerytype: '',

            //maps
            //currentPositions: new map(),

            //objects
            user: {
                positions: [
                    
                ]
            }
                

        }
    },
    computed:{
        hasOpenPositions(){
            return this.user.positions.length > 0 ? 'Here are your open positions - ' : 'You have no open positions!'
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


            const headers = {
                //bearer token and method type may be required for authenticated requests
                //ie
                //Method: 'POST',
                //Authorization: 'alksdjfljsfd',
            }

            
            
            var res = await fetch(url, {headers});

            if (!res.ok){
                swal('There was an error with your request! Please try again.')
            }

            var data = await res.json()

            console.log(data[this.stockTicker.toUpperCase()])
            this.currentPrice = data[this.stockTicker.toUpperCase()].askPrice
        },

        //this is key
        async placeOrder(){
            const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"
            var url = ''
            var redirect_uri = ''


            var headers = {
                //"session"
            }

            var body = {
                
            }
            JSON.stringify(body)

            var res = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            })
        },

        //for the future
        async getMovers(){
            const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"

        },

    }
}

</script>