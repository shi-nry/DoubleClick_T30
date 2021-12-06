<template>

<dir>
<b>
<h1 style="font-size:3vw">Settings</h1>
<br/>
<br/>
Change Preferences:
<br/>
<br/>
Change Investing Account:
<br/>
<br/>
Sign Out:
<br/>
<br/>
Contact:
<br/>
<br/>
Common Questions:
<br/>
<br/>
Show Support and Share:
<br/>
<br/>
Other, please share:
</b>
<br><input  id="help" maxlength="100" name="help" v-model = "help" size="51" type="text" required /><br><br>
<button type = "button" v-on:click = "getData()">Submit</button>

</dir>
</template>

    
<script>
export default{
    name: "test" ,
    data() {
        return {
            help: null
            }

    },
    methods: { 
        getData() {
            console.log("user issue : ", this.help);
        }
    }

}

</script>