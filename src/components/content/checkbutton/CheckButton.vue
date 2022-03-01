<template>
    <div class="check-color" :class="{check:isChecked}">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
export default {
    name:"checkbutton",
    props:{
        isChecked: {
            type:Boolean,
            default:false
        }
    }
}
</script>

<style scoped>
    .check-color {
        border-radius: 50%;
        border: 2px solid #aaa;
        
    }

    .check {
        background: red;
        border-color: red;
    }
</style>
