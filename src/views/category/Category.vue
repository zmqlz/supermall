<template>
  <div id="category" class="wrapper">
    <div class="content">
    
    </div>
  </div>
</template>

<script>
  import BScorll from "better-scroll"

  export default {
    name: "Category",
    data() {
      return{
        scroll:null
      }
    },
    mounted() {
      // console.log(document.getSelection(".wrapper"))
      this.scroll=new BScorll(document.querySelector(".wrapper"),{
      });
      console.log(11);
    },
    created() {
      console.log("11");
    },
    unmounted() {
      console.log("11");
    }
  }
</script>

<style scoped>
#category{
  height: 150px;
  background-color: deeppink;
}
</style>
