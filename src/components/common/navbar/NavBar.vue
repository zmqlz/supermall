<!-- 顶部 -->

<template>
  <div class="navbar">
    <div class="left"><slot name="left"></slot></div>
    <div class="right"><slot name="right"></slot></div>
    <div class="center"><slot name="center"></slot></div>
  </div>
</template>

<script>
export default {
  name:"NavBar"
}
</script>

<style>
.navbar {
  display: flex;
  text-align: center;
  line-height: 44px;
  box-shadow: 0 1px 1px rgba(100,100,100, 0.1);
}

.left {
  width: 60px;
  height: 44px;
}

.right {
  width: 60px;
  height: 44px;
}

.center {
  flex: 1; /*这个盒子要放在最后写才会占据剩余的盒子宽度*/
  height: 44px;
  text-align: center;
}
</style>