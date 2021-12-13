<template>
  <!--所有的item都展示同一个图片, 同一个文字-->
  <div class="tab-bar-item" @click="itemClick">
    
    <!-- 有用  建议使用下面的方法
      <slot v-if="!isActive" name="item-icon"></slot>
      <slot v-else name="item-icon-active"></slot> -->
    <div v-if="!isActive"><slot v-if="!isActive" name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!--<img src="../../assets/img/tabbar/home.svg" alt="">-->
    <!--<div>首页</div>-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      link:String,
      activeColor:{
        type:String,
        default:"red"
      }
    },
    data() {
      return {
        // isActive:false
      }
    },
    computed:{
      isActive() {
        //等于-1表示没找到=> false indexOf===>判断
        return this.$route.path.indexOf(this.link) !== -1
      },
      activeStyle() {
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods:{
      itemClick() {
       this.$router.replace(this.link)
      }
    }
  }
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

  .active{
    color: #a70505;
  }
</style>
