<style scoped>
@import '/src/pages/keepcalmfont.css';
</style>

<template>
<!-- This code will begin by printing out all available preferences. Then a text box and button will be created for submissions. (nicholas rinehart) -->
<div id="box1">
    
    <div  v-if="loggedin===true">
      

        <h1 class="white_header">Current open positions</h1>
        <div id="box3" class="paragraph">
        <b class="paragraph">Cash Balance</b>
        ${{cashMoney}}
        </div>

        <br><br><br>
        <div  v-for="position in this.positionsArray" :key="position.ticker">
        <div id="box4">
            <div>
    
                <div>
                    <h2 class="position_text_title">Trade Id : {{position.id}}</h2> 
                </div>

                <div>
                    <h2 class="position_text">Ticker Name : {{position.ticker}}</h2>
                </div>

                <div>
                    <h2 class="position_text">Buy in Price : {{position.tradePrice}}</h2>
                </div>

                <div>
                    <h2 class="position_text">Number of Shares : {{position.shares}}</h2>
                </div>

                <div>
                    <h2 class="position_text">Current Price : {{position.currentPrice}}</h2>
                </div>

                <div>
                    <h2 class="position_text">Current Profit/Loss : {{position.positionPL}}</h2>
                </div>

                <button type="button" class="button" v-bind:id="position.id" v-on:click="closePosition(position.id)"><img src="../assets/gradient_buttons/close_pos.png" width="138" height="38" border="0" color="transparent" alt="Create Account"></button>

                <br>
            </div>
        </div>
        <br>
        </div>
    </div>
    

    <div v-else-if="loggedin===false">
        <div >
            <h2> Please log in to view this page! </h2>

        </div>
    </div>

    

</div>
 
</template>


<script>
import {getAuth} from "firebase/auth";
import {onBeforeMount, ref} from 'vue';

export default{
    
    name: "position" ,
    data() {
        return {
            userId: '',
            userPostId: '',
            loggedin: '',
            stockTicker: '',
            currentPrice: '',
            positionPL: '',
            cashMoney: '',
            
            positionsArray: [],
            positionKey: '',

            
            
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
        if(this.loggedin == true){
            await this.getCashBalance();
            await this.getPositions();
        }
    },
    methods: { 
        
        async closePosition(buttonId){

            //find position ID from buttonId
            

            console.log('button id ' + buttonId)

            var targetIndex = null

            for(let i = 0; i < this.positionsArray.length; i++){
                if(this.positionsArray[i].id == buttonId){
                    targetIndex = i
                    break
                }
            }

            console.log(this.positionsArray[targetIndex].tradePrice)
            console.log(this.cashMoney + ' ' + this.positionsArray[targetIndex].positionPL)
            this.cashMoney += (parseFloat(this.positionsArray[targetIndex].positionPL) + 
                (parseFloat(this.positionsArray[targetIndex].tradePrice) * parseFloat(this.positionsArray[targetIndex].shares)))
            console.log( 'cash balance after close ' + this.cashMoney)

            
            var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/Position/' + buttonId + '.json'
            var headers = {}

            
            var body = {
                open: false,
                finalProfit: this.positionsArray[targetIndex].positionPL,
            }
            body = JSON.stringify(body)
            
            var res = await fetch(url, {
                method: 'PATCH',
                headers: headers,
                body: body
            })

            var data = await res.json()
            console.log(data)
            

            url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/User/' + this.userPostId + '.json'
            headers = {}

            console.log(this.finalProfit)
            console.log(this.cashMoney)
            body = {
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
            
            if(this.positionsArray[targetIndex].positionPL >= 0){
                swal('Position Closed Successfully! \n\nYour Total Profit From This Transaction is ' + this.positionsArray[targetIndex].positionPL)
            }
            
            if(this.positionsArray[targetIndex].positionPL < 0){
                swal('Position Closed Successfully! \n\nSorry, You Lost ' + this.positionsArray[targetIndex].positionPL+ 
                ' On This Trade')
            }
            
            //remove position from array
            this.positionsArray.splice(targetIndex, 1)

            
        },


        async getPositions(){
            if(this.loggedin == true){
                //query db for all positions with userId = this.userId
                var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/Position.json'
                var headers = {}
                var response = await fetch(url, {headers})
                var data = await response.json()

                var positionsArray = [];

                for(let key in data){
                    data[key].id = key

                    //only show positions for current logged in user
                    if(data[key].userId === this.userId && data[key].open == true){
                        positionsArray.push(data[key])
                        this.stockTicker = data[key].ticker

                        try{
                            await this.getCurrentPrice()
                            data[key].currentPrice = this.currentPrice
                        }catch{
                            console.log('could not get current price for ' + this.stockTicker)
                        }
                        console.log('trade price ' + data[key].tradePrice)
                        console.log('current price ' + this.currentPrice)

                        var profit = this.currentPrice - data[key].tradePrice
                        profit *= data[key].shares
                        this.positionPL = profit.toFixed(2)
                        data[key].positionPL = this.positionPL
                    }
                }

                
                this.positionsArray = positionsArray;
                //console.log(this.positionsArray)

            }else{
                //not loggedin, do nothing
                return
            }
        },

        async getCashBalance(){
            var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/User.json'
            var headers = {}
            var response = await fetch(url, {headers})
            var data = await response.json()

            for(let key in data){
                data[key].id = key

                
                //only show positions for current logged in user
                if(data[key].userId === this.userId){
                    this.cashMoney = data[key].cashMoney
                    console.log(this.cashMoney)
                    this.userPostId = data[key].id
                }
            }
            console.log(this.userPostId)

        },

        async getCurrentPrice(){
            const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"
            
            var url = "https://api.tdameritrade.com/v1/marketdata/"

            url += (this.stockTicker + '/quotes?apikey=' + apikey)


            const headers = {}
            var res = await fetch(url, {headers});

            if (!res.ok){
                swal('There was an error with your request! Please try again.')
            }

            var data = await res.json()

            this.currentPrice = data[this.stockTicker.toUpperCase()].askPrice
        },
    }

}
</script>

