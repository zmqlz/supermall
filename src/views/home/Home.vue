<template>
  <div id="home">
    <!-- 顶部 -->
    <nav-bar class="home-nav">
      <template #center>购物车</template>
    </nav-bar>

    <!-- better-scroll框架 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="homeScroll"
      :pull-up-load="true"
      @pullingUp="homeLoadMore"
    >
      <!-- 轮播图组件 -->
      <home-swiper :cbanners="banners"></home-swiper>
      <!--推荐  -->
      <home-recommend :crecommends="recommends" />
      <!--本周流行  -->
      <feature-view />
      <!-- 分类 -->
      <tab-control
        class="tab-control"
        :titles="['精选', '新款', '精选']"
        @tabClick="HtabClick"
      />
      <!-- 商品列表 -->
      <goods-list :goods-list="showGoods" />
    </scroll>
    <!-- 到达顶部的箭头 .native:监听组件点击-->
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
// 子组件
import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecommend from "./childComponents/HomeRecommend";
import FeatureView from "./childComponents/FeatureView";

// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 方法
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] },
      },
      currentType: "pop",
      isShow: false,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },

  created() {
    this.MgetHomeMultidata();

    this.MgetHomeGoods("pop");
    this.MgetHomeGoods("new");
    this.MgetHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    HtabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    backClick() {
      this.$refs.scroll.ScrollTo(0, 0);
    },
    homeScroll(position) {
      // console.log(position);
      this.isShow = -position.y > 1000;
    },
    homeLoadMore() {
      // console.log("上拉加载更多");   
      this.MgetHomeGoods(this.currentType);
      console.log(this.goods[this.currentType].list);
      this.$refs.scroll.finishPullUp()
      
    },
    /**
     * 网络请求相关的方法
     */
    MgetHomeMultidata() {
      getHomeMultidata().then((result) => {
        // console.log(result.data);
        this.banners = result.data.banner.list;
        this.recommends = result.data.recommend.list;
      });
    },
    MgetHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((result) => {
        // ...数组  可以直接加数组加入到另一个数组这
        this.goods[type].list.push(...result.data.list);
        this.goods[type].page + 1;
        //console.log(this.goods[type].list);
      });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#home {
  height: 100vh; /* 占据当前窗口的100% */
  /* padding-top: 44px; */
  position: relative;
}

.home-nav {
  background-color: var(--color-tint); /*使用变量*/
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

/* 当top值到达44px时,属性就会变成fixed */
.tab-control {
  /* position: sticky; */
  top: 44px;
  z-index: 10;
}

/* .content{
  height: 700px;
  overflow: hidden;
} */

.content {
  position: absolute;
  top: 48px;
  bottom: 49px;
  right: 0;
  left: 0;
}

/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
