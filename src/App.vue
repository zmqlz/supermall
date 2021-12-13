<template>
  <div id="app">
    <!-- 解决无法使用ues方法安装router:第三步   可以不写-->
    <!-- <router-view v-slot="{Component}">
      <component :is="Component" />
    </router-view> -->

    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/tabbar/MainTabBar'


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
