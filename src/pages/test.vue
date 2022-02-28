<template>

<div>
This is a sandbox testing area.
    <br><br>
    Enter your stock ticker
    <br><br>


    <input type="text" name="stockTicker1" v-model="stockTicker" />
    <br><br>
    <button type="button" v-on:click="getCurrentPrice()" >Get Market Data</button>
    <br><br>
    
    
    The current price of {{stockTicker.toUpperCase()}} is {{currentPrice}}
    

</div>
</template>

    
<script>


export default {
    name: "test",
    data()
    {
        return {
            stockTicker: '',
            currentPrice: '',
        }
    },
    props:{
        
    },
    methods:{
        async getCurrentPrice(){
            const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"
            //need to build URL
            var url = "https://api.tdameritrade.com/v1/marketdata/"
            console.log(this.stockTicker)
            
            if(this.stockTicker.length > 4){
                alert('Please enter a valid stock ticker!')
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
            
            const res = await fetch(url, {headers});

            if (!res.ok){
                alert('There was an error with your request! Please try again.')
            }

            var data = await res.json()
            
            console.log(data[this.stockTicker.toUpperCase()])
            this.currentPrice = data[this.stockTicker.toUpperCase()].askPrice
        }
    }
}

</script>
