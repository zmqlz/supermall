<template>
  <div id="app">
    <!-- <router-view></router-view> -->

    <!-- vue3中keep-alive的写法(使用路由缓存)-->
    <router-view v-slot="{ Component }">
      <!-- vue3这exclude的用法 -->
      <keep-alive :exclude="['detail']">  
        <component :is="Component"/>
      </keep-alive>
    </router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/tabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
