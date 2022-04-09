<template>
<!-- This code will begin by printing out all available preferences. Then a text box and button will be created for submissions. (nicholas rinehart) -->
<div >
    
    <div>
         <b> Please choose your preferences here! </b>
    </div>
    

<br><br><br>


    <div>
        <b>Is your risk tolerance low or high?</b><br><br>
       <select id="riskTolerance" name="riskTolerance" v-model="riskTolerance" >
            <option value="low">low risk</option>
            <option value="high">high risk</option>
        </select>
    </div>

<br><br><br><br>

    <div>
        <b>Are dividends important to you?</b><br><br>
       <select id="dividendImportance" name="dividendImportance" v-model="dividendImportance" >
            <option value="None">Not at all</option>
            <option value="Low">Some dividends would be nice (1-2%)</option>
            <option value="High">I need impressive dividends (3% or more)</option>
        </select>
    </div>

<br><br><br><br>

    <div>
        <b>What's your preferred hold time for a position?</b><br><br>
       <select id="holdTime" name="holdTime" v-model="holdTime" >
            <option value="long">Long Term</option>
            <option value="short">Short Term</option>
        </select>
    </div>
    
    <br>
    <br>

    
    <button type = "button" v-on:click = "postPreferenceToDB()">Update Preferences</button>

    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
</div>
</template>


<script>


export default{
    name: "preference" ,
    data() {
        return {
            userid: "test",

            riskTolerance: "",
            dividendImportance: "",
            holdTime: "",
            
        }

    },
    methods: { 
        async postPreferenceToDB(){
            var url = 'https://doubleclick-461f4-default-rtdb.firebaseio.com/User.json'
            var headers = {}

            console.log(this.riskTolerance)
            console.log(this.dividendImportance)
            console.log(this.holdTime)

            var body = {
                userid: this.userid,
                riskTolerance: this.riskTolerance,
                dividendImportance: this.dividendImportance,
                holdTime: this.holdTime
            }
            body = JSON.stringify(body)
            
            //method PATCH maybe?
            var res = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body
            })

            var data = await res.json()
            console.log(data)

        },
    }

}
</script>

<style scoped>




</style>
