<template>
  <h2>个人</h2>
</template>

<script>
  export default {
    name: "Profile",
    unmounted() {
      console.log("unmounted");
    },
    distroyed() {
      console.log("distroyed");
    },
    created() {
      console.log("created");
    }
   }
</script>

<style scoped>

</style>
