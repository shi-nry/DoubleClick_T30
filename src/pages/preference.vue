<style scoped>
    @import 'keepcalmfont.css';
</style>

<template>
<!-- This code will begin by printing out all available preferences. Then a text box and button will be created for submissions. (nicholas rinehart) -->
<div id="box1">
<div >
    <div  v-if="loggedin===true">
    



        <h3 class="white_header">Preferences</h3>
    
        <h5 class="paragraph_small">The preferences sections allows you to input your desired values for
        risk tolerance, dividend importance, and your preferred hold time. By inputting these values,
        not only will it allow you to interact with our service, but it will allow you to be suggested trades
        that align with your values. Please answer the questions below:
        </h5>


        <div id="box2">
        <div>
            <h2 class="paragraph">Is your risk tolerance low or high?</h2>

                            <div class="list-choice">
  <div class="list-choice-title">Please indicate risk tolerance:</div>
  <div class="list-choice-objects">
    <label>
      <input type="radio" value="low" name="riskTolerence" v-model="riskTolerance"/>     <span>Low</span>
    </label>
    <label>
      <input type="radio" value="high" name="riskTolerance" v-model="riskTolerance"/>          <span>High</span>
    </label>
  </div>
</div>

           
         </div>


        <br><br><br><br>

         <h2 class="paragraph">Are dividends important to you?</h2>

             <div class="list-choice">
  <div class="list-choice-title">Please select dividend importance:</div>
  <div class="list-choice-objects">
    <label>
      <input type="radio" value="none" name="dividendImportance" v-model="dividendImportance"/>        <span>Not at all</span>
    </label>
    <label>
      <input type="radio" value="low" name="dividendImportance" v-model="dividendImportance"/>        <span>Some dividends would be nice (1-2%)</span>
    </label>
    <label>
      <input type="radio" value="high" name="dividendImportance" v-model="dividendImportance"/>       <span>I need impressive dividends (3% or more)</span>
    </label>
  </div>
</div>

<div>

             
        </div>

    <br><br><br><br>


<h2 class="paragraph">What's your preferred hold time for a position?</h2>

        <div class="list-choice">
  <div class="list-choice-title">Please select preferred hold time:</div>
  <div class="list-choice-objects">
    <label>
      <input type="radio" value="long" name="holdTime" v-model="holdTime"/>                         <span>Long Term</span>
    </label>
    <label>
      <input type="radio" value="short" name="holdTime" v-model="holdTime"/>                         <span>Short Term</span>
    </label>
  </div>
</div>
    
<div>
            
        </div>

        <br>
        <br>

    
        <button type = "button" class="button" v-on:click = "postPreferenceToDB()" ><img src="../assets/gradient_buttons/Update_Preferences.png" width="138" height="38" color="transparent" alt="Create Account"></button>
        <br><br>
        </div>
        <br><br>

    </div>
    <div v-else-if="loggedin===false">
        <div>
            <h2> Please log in to view this page! </h2>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
    </div>
</div>

</div>

</template>


<script>
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";

export default{
    name: "preference" ,
    data() {
        return {
            userid: '',
            loggedin: '',

            riskTolerance: '',
            dividendImportance: '',
            holdTime: '',
            hasPreferences: '',

            testbuttonmodel2: '',

            userPostId: '',
            
            
            
        }

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
    async beforeMount(){
        if(this.loggedin === true){
            console.log(this.user)
            await this.getUserInfo();
        }
    },

    methods: { 

        async getUserInfo(){
            var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/User.json'
            var headers = {}
            var response = await fetch(url, {headers})
            var data = await response.json()
            console.log(data)

            for(let key in data){
                data[key].id = key
                
                //get info + post id for current logged in user
                if(data[key].userId === this.userid){
                    this.userPostId = data[key].id
    
                    this.cashMoney = data[key].cashMoney

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
                    console.log(this.hasPreferences)


                }
            }

        },

        async postPreferenceToDB(){
            var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/User/' + this.userPostId + '.json'
            var headers = {}

            console.log(this.riskTolerance)
            console.log(this.dividendImportance)
            console.log(this.holdTime)

            var body = {
                userId: this.userid,
                riskTolerance: this.riskTolerance,
                dividendImportance: this.dividendImportance,
                holdTime: this.holdTime
                //cashMoney: .cashMoney
            }
            body = JSON.stringify(body)
            
            //method PATCH maybe?
            var res = await fetch(url, {
                method: 'PATCH',
                headers: headers,
                body: body
            })

            var data = await res.json()
            console.log(data)

            swal('Preferences Updated Successfully!')

        },
    }

}
</script>

<style scoped>




</style>
