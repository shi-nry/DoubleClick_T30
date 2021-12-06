<template>
<dir>
    <b>
    Here are the preferences from which you may choose from.
    <br />
    <br />
    1: Enviornmental
    <br />
    2: Ethicaly Sourced Resources
    <br />
    3: Tech
    <br />
    4: Manufacturing
    <br />
    5: Agricultural
    <br />
    6: National
    <br />
    7: International 
    <br />
    8: Free Trade
    <br />
    9: Freedom Index
    <br />
    <br /> 
    Please insert your preferences by number in the text box below. (seperated by commas)
    <br />
    </b>
   
    <br><input  id="Preferences" maxlength="17" name="Preferences" v-model = "Preferences" size="17" type="text" required /><br><br>
    <br />
    <br />

    If there is a preference you wish to see here please comment below.
    <br><input  id="suggestion" maxlength="100" name="suggestion" v-model = "suggestion" size="51" type="text" required /><br><br>
    <button type = "button" v-on:click = "getData()">Submit</button>


</dir>
</template>

    
<script>

export default{
    name: "preference" ,
    data() {
        return {
            Preference: null,
            sugggestion: null
            }

    },
    methods: { 
        getData() {
            console.log("values : ", this.Preference,this.suggestion);
        }
    }

}
</script>
