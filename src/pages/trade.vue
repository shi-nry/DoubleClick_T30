<script setup>
</script>

<!-- This file hosts the trade page of the web application -->
<!-- Currently, png files are placeholders for actual data and trade components -->
<!-- This file was worked on by Henry Shi -->

<template>
<div>
    <div id="trade">
        <span style="font-size: 50px; color: #099ba3;">Trade</span>
        <span style="font-size: 30px;"> SPY</span>
    </div>
        
    <div id="cards">
        <img src="src\assets\main_screen\aboutStockPlaceholder.png" 
            width="60%" height="60%" />
        <img src="../assets/main_screen/discard pile base.png" 
            style="margin: 10px 10px 70px 50px;" 
            width="15%" height="15%"/>
        <img src="../assets/main_screen/s_p stock purchase card.png" 
            style="margin: 10px 0px 60px 20px;" 
            width="16%" height="15%" />
        <img src="../assets/main_screen/performance placeholder.png"
            style="margin: 10px 0px 0px 0px;" 
            width="60%" height="60%" />
        <img src="../assets/gradient_buttons/new_trade_button.png" 
            style="position:relative; left:20px; top:-275px" 
            width="250" height="100%" />
        <img src="../assets/gradient_buttons/place_trade_button.png" 
            style="position:relative; left:0px; top:-275px" 
            width="250" height="100%" />
        <img src="../assets/main_screen/tradeInfoPlaceholder.png" 
            align="right"
            style="position:relative; left:10px; top:-275px"
            width="500" height="100%" />
        
        
    </div>
         
</div>        
</template>

<style scoped>
#trade {
    text-align: center;
}
#cards {
    text-align: left;
}
</style> 
