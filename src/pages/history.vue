<style scoped>
@import '/src/pages/keepcalmfont.css';
</style>

<template>
<!-- This code will begin by printing out all available preferences. Then a text box and button will be created for submissions. (nicholas rinehart) -->
<div id="box1">

    <div  v-if="loggedin===true">
      

        <h1 class="white_header">Performance</h1>

        <div id="box3" class="paragraph">
            <b class="paragraph">Cash Balance</b>
            ${{cashMoney.toFixed(2)}}
        </div>
        <br>
        <div id="box5">
            <h2 class="paragraph">Stats</h2>
            <div>
                <h2 class="stat_text">Your rank is {{userRank}} among {{numberOfUsers}} users for current cash balance</h2>
                
                <h2 class="stat_text">Your total realized profit is ${{totalUserPL}} since your start of using Doubleclick</h2>
                
            </div>
        </div>

        
        <div>
            <h2>Trade History</h2>
            
        </div>

        <div v-for="position in this.positionsArray" :key="position.ticker" v-bind:id="position.id">
            <div id="box4">
    
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
                    <h2 class="position_text">Total Profit : {{position.finalProfit}}</h2>
                </div>

            </div>
            <br>
        </div>


        



    </div>
    

    <div v-else-if="loggedin===false">
        <div>
            <h2> Please log in to view this page! </h2>
        </div>
    </div>

    

</div>
 
</template>


<script>
import {getAuth} from "firebase/auth";
import {onBeforeMount, ref} from 'vue';

export default{
    
    name: "tradehistory" ,
    data() {
        return {
            userId: '',
            userPostId: '',
            loggedin: '',
            stockTicker: '',
            currentPrice: '',
            positionPL: '',
            cashMoney: '',
            finalProfit: '',
            
            positionsArray: [],
            positionKey: '',

            userRank: '',
            totalUserPL: '',
            totalPL: '',
            numberOfUsers: '',
            userIdArray: [],
            
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
        
            await this.getCashBalance();
            await this.getPositions();
        
    },
    methods: { 
        
        //gets positions for this user, also gets all users
        async getPositions(){
            if(this.loggedin == true){

                //query db for all positions with userId = this.userId
                var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/Position.json'
                var headers = {}
                var response = await fetch(url, {headers})
                var data = await response.json()
                this.totalUserPL = 0

                var positionsArray = [];

                for(let key in data){
                    data[key].id = key

                    //only show positions for current logged in user
                    if(data[key].userId === this.userId && data[key].open == false){
                        positionsArray.push(data[key])
                        this.stockTicker = data[key].ticker

                        //data[key].finalProfit = this.finalProfit
                        this.totalUserPL += parseFloat(data[key].finalProfit)
                        
                        //console.log('trade price ' + data[key].tradePrice)
                        //console.log('current price ' + this.currentPrice)

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
            var userCounter = 0
            var cashMoneyArray = []
            this.userRank = 0

            for(let key in data){
                data[key].id = key
                
                //only show positions for current logged in user
                if(data[key].userId === this.userId){
                    this.cashMoney = data[key].cashMoney
                    console.log(this.cashMoney)
                    this.userPostId = data[key].id
                }

                userCounter++

                var userCash = parseFloat(data[key].cashMoney)
            
                cashMoneyArray.push(userCash)

            }

            this.numberOfUsers = userCounter

            cashMoneyArray.sort(function(a,b){
                return a - b
            }).reverse()


            console.log(cashMoneyArray)


            for(let money in cashMoneyArray){
                this.userRank++
                if(cashMoneyArray[money] == this.cashMoney){
                    break
                }
            }


        },

    }

}
</script>


