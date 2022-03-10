<style scoped>
    @import 'keepcalmfont.css';
</style>

<template>

<div>
<p class="white_subheader"> This is a sandbox testing area.</p>
    <p class="paragraph"> Enter your stock ticker</p>


    <input type="text" name="stockTicker1" v-model="stockTicker" />
    <br><br>
    <button type="button" class="button" v-on:click="getCurrentPrice()" ><img src="../assets/gradient_buttons/get_market_data.png" width="138" height="38" color="transparent" alt="Create Account"></button>
    <br><br>
    <p class="paragraph">The current price of {{stockTicker.toUpperCase()}} is {{currentPrice}}</p>
    <br><br>
 

    <!---<button type="button" v-on:click="loginwithTD()" >Login to TD</button>
    <br><br>-->
    <p class="paragraph">Click to refresh bearer access token</p>
    
    <button type="button" class="button" v-on:click="refreshBearerToken()" ><img src="../assets/gradient_buttons/get_new_token.png" width="138" height="38" color="transparent" alt="Create Account"></button>
    <br><br><br>
    

    <p class="paragraph">TD Account Info</p>
    <br><br>
    <p class="paragraph">Select Query Type</p>
    <select  id="infotype" name="infotype" title="Info Type" v-model="accountquerytype">						    
    <option value="positions">positions</option>
    <option value="orders">orders</option>
    </select>
    <br><br>

    <button type="button" class="button" v-on:click="getTDAccountInfo()" ><img src="../assets/gradient_buttons/get_account_info.png" width="138" height="38" color="transparent" alt="Create Account"></button>
    
    <p class="paragraph">Your AccountID is {{accountID}}</p>
    
    <p class="paragraph">Your Cash Balance is {{cashbalance}}</p>
    



    <p class="paragraph">Your Current Postitions are</p>


    <!--
    <div id='accountBalances' v-for="position in this.user.positions" :key"positions.id">

    {{this.user.positions}};
    
    </div>
    -->

</div>
</template>

    
<script>
//var bearer_token = '';
const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"

//Loren's personal login, don't fuck with my account please this is my real money
const accountid = '497688713'
const refresh_token = 'TDyuyZcmghcTE/lEvAVQLGeBDmfPcy2yr67Lg80pMp9rJhrEeujh/11kUfQcYI0XYoCzJbMAQsPGO4V4S4RS9oF3pMwN4JkcFdPAG4vwFDWMqAGYdLASNuUZPkfIz/3rHsP7OX44ecnd27Vb88R94LUqLLYxcQmFjpBaa+MaGpl2S+4k/UcQQCGBxvZGoABChAQEhy9lMDqqm792AfbkhSFr4GwnhawRnPfVdxvFVDX0QHIz0gsBA/FnegeIp080xStbnOHRS56YI40T060PQNGz8sTKhakQeAaBBIknOvOHIhBVRQeaKh43t59wD1iCmMbA2g20HxzztS3lT+SOQdtzaHU71/J/eEevpy+uWjn3AfNzIUEDsv4q1+dOdQiakZUmU1tm/4bNY84dM+71q7+YVwHH9O3W/HKtMP+W4E4BEgsKffcqQXsp1NT100MQuG4LYrgoVi/JHHvlmN3hP9X7y27REh/bhunPl/kBMmFIVeIlbbxD8pEWuGHvV4BMKGNCSsPYQZk+2/VUsL3EoqXpK/Yk/9Qyc7bPjsqz0gphzf2bYwo7tQLjeYe84LeuOZ6q+/8njy90IM0JA0ZiWsg7Xt9WCnzYBEhiQkldN1LQmy1jn8xxMvstdAOTrCobbhicAjCC0eCZkEz/QTtJBKFsV1Jno2W5PBrSLV/EFVxvplx5E7i+vbPi6Xw3nfnvmJvD3brIejrYgBKad+918qMqLdOOjhDKnl3SDg1gxvaQlVCLAvfThHqHly5gEpduScim3EpImGajcxvYitELveHoHDV0KTGfaqX/7hyNuGFfYqDSQrQOsq1paCeJAA2bFPjH0Fq6cyXXhaCPS3xsm4plz/vvMEAKBzGZcwacl5layv9xT8zwbEsHOBqebjf2GEe3K8Ah6KM=212FD3x19z9sWBHDJACbC00B75E'



export default {
    name: "test",
    data()
    {
        return {
            //single variables
            stockTicker: '',
            currentPrice: '',
            loggedin: false,
            accountID: accountid,
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

        
        async getTDAccountInfo(){
            const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"

            //need to add accountID at the end
            var url = 'https://api.tdameritrade.com/v1/accounts/'
            url += accountid
            if(this.accountquerytype === 'positions'){
                url += '?fields=positions' + '?apikey=' + apikey
            }else if(this.accountquerytype === 'orders'){
                url += '?fields=orders'
            }

            const headers = {
                Method: 'POST',
                Authorization: 'Bearer D3QUl/grNL7MUoD0NyXqD6kd7SedkU54HfXu6+0Ne4D8vl4jEeUeTY/dfyOsbbaqHp7mzUH2Y+p+z1KkM3l76HembD8QJaq2g0XoJM+u0qdHhhWWW4Lj2CEbYZ7wAvdsZWSHirmQSG0Cw6KJd4gPwgFH3wCDOSc+1qJjijdwoZx516WlBcwvLW9NZ9woGrSnAc+nJu39/SqmLFBi0fh298CGLFq6nquZZu9yoYy3OXNHj9ulI4thByLqNO/rsWh30zkV2h7Mjux3B8h3ONdkIoajdHODlN8JpWawz8MpEcwV5a8ZVASzUcBIvlu+LA78Vh+6nP/c0xotMIm4jZ5Hnu/hxnV/dzg89h0pEXWVSJ3tCUDH7UNx0JgesndhvGOI2UnKDcaratcWTLQBCi6cBKOqdAkM+XRnSgMLRylnYCNChdLIREpO8/7S2Bha7NUe4nhN0pfNmo5UpYt1rhbvr4fTa3P0fyuRRJofhham4STCNjx++HadrYQnVqrVI+33sSBnIAa62EJxiSVaMrru+G6aqTNhzFqdC4hHz3VHNXj59UYHs100MQuG4LYrgoVi/JHHvl94nP0i4rgz491dJRe0ZgpwWh+3FZ+b0y8WSHiSGaErWTZjA7DDrT+aJ+5dKWpnAYDDQ7hq3zYO59W/DYUWk5eX2o+/7DU7fnX49tLmdPZZc99gsFxZyVJu019G7TVslYCYO/Vy5HOzXB+Ysq60f6rJAI/WLdtcxCqWDg+AiAPRsgrHbYooqp2SxO15VqP0ME0acHxvEAYoRXIdxmjMnKJA5hivg7qDSQZKVM8vAgys6w9IUCklVyZR+Q6xvB45VZIMzQBm1rBOYS/7ljANkGdpPiFhDqJRnTOkj1hoY9rJBs4dPZ1AIIyvazgG7LYwzkLzDDyKgtjYa+jPF9/Uc7ZO7qobkAozpFD+41mYPAR6CZ98JLE3FOa0j9nTAQfd2Vwimp4NaqC3hEFtdf5SKqHm8jeZA4U2fq/CxXFAMxz0k+d9vddioKaa/jvz23b4DD6pnh3nJNgAiReu+SCk+yDvDcEvXLbr7a8UhXzTaTrrGBPSDxqqBagZbL/wxDLrqtwi3IWYg4xSGnxq1LlsvZTwfocs5s9R6TMmtzlgsCdRkXKIbA==212FD3x19z9sWBHDJACbC00B75E',
            }
            
            //waiting to make request until I figure out reactive maps
            
            var res = await fetch(url,
                );

            if (!res.ok){
                swal('There was an error with your request! Please try again.')
            }

            var data = await res.json()
             
            this.testbody = data
            console.log(this.testbody)
            //this.currentPositions.set('testkey', 'testvalue')

        },





        //bearer access token expires every 30 minutes
        //refresh token is hardcoded so we can call this function
        //and update bearer whenever we reload the page
        async refreshBearerToken(refresh_token){
            var url = 'https://api.tdameritrade.com/v1/oauth2/token'
            const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"
            //url += '?apikey=' + apikey


            var headers = {
                "Content-Type": 'application/x-www-form-urlencoded'
            }

            var body = {
                "grant_type": "refresh_token",
                "refresh_token": "TDyuyZcmghcTE/lEvAVQLGeBDmfPcy2yr67Lg80pMp9rJhrEeujh/11kUfQcYI0XYoCzJbMAQsPGO4V4S4RS9oF3pMwN4JkcFdPAG4vwFDWMqAGYdLASNuUZPkfIz/3rHsP7OX44ecnd27Vb88R94LUqLLYxcQmFjpBaa+MaGpl2S+4k/UcQQCGBxvZGoABChAQEhy9lMDqqm792AfbkhSFr4GwnhawRnPfVdxvFVDX0QHIz0gsBA/FnegeIp080xStbnOHRS56YI40T060PQNGz8sTKhakQeAaBBIknOvOHIhBVRQeaKh43t59wD1iCmMbA2g20HxzztS3lT+SOQdtzaHU71/J/eEevpy+uWjn3AfNzIUEDsv4q1+dOdQiakZUmU1tm/4bNY84dM+71q7+YVwHH9O3W/HKtMP+W4E4BEgsKffcqQXsp1NT100MQuG4LYrgoVi/JHHvlmN3hP9X7y27REh/bhunPl/kBMmFIVeIlbbxD8pEWuGHvV4BMKGNCSsPYQZk+2/VUsL3EoqXpK/Yk/9Qyc7bPjsqz0gphzf2bYwo7tQLjeYe84LeuOZ6q+/8njy90IM0JA0ZiWsg7Xt9WCnzYBEhiQkldN1LQmy1jn8xxMvstdAOTrCobbhicAjCC0eCZkEz/QTtJBKFsV1Jno2W5PBrSLV/EFVxvplx5E7i+vbPi6Xw3nfnvmJvD3brIejrYgBKad+918qMqLdOOjhDKnl3SDg1gxvaQlVCLAvfThHqHly5gEpduScim3EpImGajcxvYitELveHoHDV0KTGfaqX/7hyNuGFfYqDSQrQOsq1paCeJAA2bFPjH0Fq6cyXXhaCPS3xsm4plz/vvMEAKBzGZcwacl5layv9xT8zwbEsHOBqebjf2GEe3K8Ah6KM=212FD3x19z9sWBHDJACbC00B75E",
                "access_type": '',
                "code": '',
                "client_id": "TILH8USQQOGPD8OQWLDV033FIOBDENMY",
                "redirect_uri": "https://localhost:8080/td-login-redirect"
            }
            JSON.stringify(body)

            var res = await fetch(url, {
                method: 'POST',
                headers: headers,
                data: body
            })
            /*
            var res = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
            }, 
            body: JSON.stringify({
                "grant_type": "refresh_token",
                "refresh_token": "TDyuyZcmghcTE/lEvAVQLGeBDmfPcy2yr67Lg80pMp9rJhrEeujh/11kUfQcYI0XYoCzJbMAQsPGO4V4S4RS9oF3pMwN4JkcFdPAG4vwFDWMqAGYdLASNuUZPkfIz/3rHsP7OX44ecnd27Vb88R94LUqLLYxcQmFjpBaa+MaGpl2S+4k/UcQQCGBxvZGoABChAQEhy9lMDqqm792AfbkhSFr4GwnhawRnPfVdxvFVDX0QHIz0gsBA/FnegeIp080xStbnOHRS56YI40T060PQNGz8sTKhakQeAaBBIknOvOHIhBVRQeaKh43t59wD1iCmMbA2g20HxzztS3lT+SOQdtzaHU71/J/eEevpy+uWjn3AfNzIUEDsv4q1+dOdQiakZUmU1tm/4bNY84dM+71q7+YVwHH9O3W/HKtMP+W4E4BEgsKffcqQXsp1NT100MQuG4LYrgoVi/JHHvlmN3hP9X7y27REh/bhunPl/kBMmFIVeIlbbxD8pEWuGHvV4BMKGNCSsPYQZk+2/VUsL3EoqXpK/Yk/9Qyc7bPjsqz0gphzf2bYwo7tQLjeYe84LeuOZ6q+/8njy90IM0JA0ZiWsg7Xt9WCnzYBEhiQkldN1LQmy1jn8xxMvstdAOTrCobbhicAjCC0eCZkEz/QTtJBKFsV1Jno2W5PBrSLV/EFVxvplx5E7i+vbPi6Xw3nfnvmJvD3brIejrYgBKad+918qMqLdOOjhDKnl3SDg1gxvaQlVCLAvfThHqHly5gEpduScim3EpImGajcxvYitELveHoHDV0KTGfaqX/7hyNuGFfYqDSQrQOsq1paCeJAA2bFPjH0Fq6cyXXhaCPS3xsm4plz/vvMEAKBzGZcwacl5layv9xT8zwbEsHOBqebjf2GEe3K8Ah6KM=212FD3x19z9sWBHDJACbC00B75E",
                "access_type": "",
                "code": "",
                "client_id": "TILH8USQQOGPD8OQWLDV033FIOBDENMY",
                "redirect_uri": "https://localhost:8080/td-login-redirect"})
            });
            */
            console.log(res)

            if (!res.ok){
                swal('There was an error with your request! Please try again.')
            }

            var data = await res.json()
            console.log(data)
            this.bearer_token = data.access_token
            this.loggedin = true

            console.log(this.bearer_token)
            console.log(this.loggedin)
        },


        //this needs a valid code from a URL (bullshit)(hard)
        async loginwithTD(){
            const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"
            var url = 'https://api.tdameritrade.com/v1/oauth2/token'
            url += ('?apikey=' + apikey)

            var code = getcode()

            var res = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            body: JSON.stringify({
                "grant_type": "authorization_code",
                "refresh_token": "",
                "access_type": "offline",
                "code": code,
                "client_id": apikey,
                "redirect_uri": 'https://localhost:8080/td-login-redirect'})
            });
            
            
            console.log(res)

            if (!res.ok){
                swal('There was an error with your request! Please try again.')
                if(res.status === '401'){
                    swal('Unathenticated Request')
                }
            }

            var data = await res.json()
            console.log(data)
            //https://developer.tdameritrade.com/content/simple-auth-local-apps
        },
        
        /*
        if user is not logged in and does not have credentials stored, a new code will need to be requested
        in order to get a bearer access token.
        */
        async getCode(){
            const apikey = "TILH8USQQOGPD8OQWLDV033FIOBDENMY"
            var urlencodedredirecturi = encodeURI('https://localhost:8080/td-login-redirect')

            //build authurl for TD authentication
            var authurl = 'https://auth.tdameritrade.com/auth?response_type=code&' + urlencodedredirecturi
            authurl += '&client_id=' + apikey + '%40AMER.OAUTHAP'

            console.log(authurl)

            /*
            INSTRUCTIONS TO GET CODE

            https://developer.tdameritrade.com/content/simple-auth-local-apps

            once code is gotten from URL you can request for an access token 
            see https://developer.tdameritrade.com/authentication/apis/post/token-0
            for details

            **note - if you get "invalid_grant" error make sure you are using an ENCODED uri redirect

            make sure you save the response (I used postman but you can request directly through TD)
            */

            //do string magic (regex maybe) to get decoded code from url
            //gonna hardcode it here for now though
            //update the codes only last for 30 minutes
            var code = 'XZHcyXwskFb1TOfySEuSSLPGYRgz+PtZ7dqRR+LZnWf6U6y6vf5plNISAN46qLAnk/Vytj2ucAoPDsEyRpvthNcogh2UqzeoiWgdxGbXoE0wpug/GOiJgqRbt3zPjeAfcBrypCWoWICOfhLfuL1CZzTG0UC+RSNAcnHuHEJmYVpHuD8bX0y+Lp7ZExvkLz4KWy/nXhWY2rjFY/ZGV2x9KjwvvCfuTiVtOZ434yopELGXW/VakkUV7a0Hra31WUuK3Ld4/wY4KK96bN/k7gsen4WYZQTdtK44y0BkJKUrWouuidTAE/q89QwDaar4GXEJk5AR8YTwtVNUDxe4zZcdPxwKPtUTPcjdUuKBJCnmtqoX2702ZyqMpl3FwCHaSSqMDgVd6JgVklk1uWHdF0vxH9E+frYY07cfk0Ej1Q2uoHZ1+gn1odtxnxySrrD100MQuG4LYrgoVi/JHHvlpw0ZdQocS8JeDKKtTcjWewrCfQQASsgZOxQFvgxNRlVpdKhq9/fyNVSYo1wsw+UojLWuo9pEOWUw26iVjs8u1T6iFEgb1HWg7NwvXKd+zdPtE0gqEUso+DxpwPwn38X1ot5tJzqvcRgS55fHwoHcGb14IKwwsMPnzr0AEcBIhrbeAI7IM8h7RXF//PHbGKBlPR3OtO8bFhm4LGbIjEnngitzNmswIzBsj5DNHm8W2R4pOk7lm2cqLzNyTQwdHbAtM9q5QWexfrYf9AKff0f6veEOChOpqY96F7H3HB8vG/CuZ3/64YCv2clQw8WFQKOeLg//Xr84iEQTmkvL8dGWfEWX4BI0eIKT3FZu1l9bdvLJTobsUsXAQK+Fdg99P5s7hYqbYk/At6tD2hfBYKRXGHuKAvW1hvvm9JHCE9ph6Vw7nUtwLRESUMlTD50=212FD3x19z9sWBHDJACbC00B75E'
            return code
        }
    }
}

</script>