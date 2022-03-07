<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-top" @titleClick="selectIndex" ref="navbar" />
    <scroll class="content" ref="scroll" @scroll="scroll" :probeType="3">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages" />
      <!-- 商品介绍 -->
      <detail-base-info :goods="goods" />
      <!-- 商家信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品详细信息 -->
      <detail-goods-info :detail-info="goodsInfo" @imageLoad="DetailImgLoad" />
      <!-- 尺寸信息 -->
      <detail-param-info :param-info="params" ref="param" />
      <!-- 用户评论 -->
      <detail-comment-info :comment-info="comment" ref="Comment" />
      <!-- 商品推荐 -->
      <goods-list :goods-list="recommends" ref="recommend" />
    </scroll>
    <!-- 到达顶部的箭头 .native:监听组件点击-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- 底部工具栏(购物车) -->
    <detail-buttom-bar @addCart="addToCart" />
    <!-- 加入或购买成功的弹框显示 -->
    <toast :message="message" :show="show" />
  </div>
</template>

<script>
import bus from "@/bus";

import DetailNavBar from "./childComponent/DetailNavBar";
import DetailSwiper from "./childComponent/DetailSwiper";
import DetailBaseInfo from "./childComponent/DetailBaseInfo";
import DetailShopInfo from "./childComponent/DetailShopInfo";
import DetailGoodsInfo from "./childComponent/DetailGoodsInfo";
import DetailParamInfo from "./childComponent/DetailParamInfo";
import DetailCommentInfo from "./childComponent/DetailCommentInfo";
import DetailButtomBar from "./childComponent/DetailButtomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utlis";

// 混入中的方法
import { itemListenerMixin, backTop } from "common/mixin";

export default {
  name: "detail",
  mixins: [itemListenerMixin, backTop],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      goodsInfo: {},
      params: {},
      comment: {},
      recommends: {},
      themeTopsYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      message:"",
      show:false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailButtomBar,
    Toast,

  },
  methods: {
    DetailImgLoad() {
      this.$refs.scroll.refresh();

      // 防抖可以不用
      // this.getThemeTopY();

      // console.log(this.$refs.recommend.$el,"------",this.$refs.Comment.$el);
      this.themeTopsYs = [];
      this.themeTopsYs.push(0);
      this.themeTopsYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopsYs.push(this.$refs.Comment.$el.offsetTop);
      this.themeTopsYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopsYs.push(Number.MAX_VALUE); //Number.MAX_VALUE 获取js中所能打印出的最大值
      // console.log(this.themeTopsYs);
    },

    selectIndex(index) {
      // console.log(index);
      this.$refs.scroll.ScrollTo(0, -this.themeTopsYs[index], 200);
    },

    scroll(position) {
      // console.log(position);
      const positionY = -position.y;
      let length = this.themeTopsYs.length;
      for (let i = 0; i < length - 1; i++) {
        // 普通做法  length不需要减一
        //   if (
        //     this.currentIndex !== i &&
        //    ((i < length - 1 &&
        //       positionY >= this.themeTopsYs[i] &&
        //       positionY < this.themeTopsYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopsYs[i]))
        //   ) {
        //     this.currentIndex = i;
        //     // console.log(this.currentIndex);
        //     this.$refs.navbar.currentIndex = this.currentIndex;
        //   }

        // 简便写法(hackx做法)--用内存换时间
        // 在themeTopsYs后push一个最大值  Number.MAX_VALUE,所以length就要减一
        if (
          this.currentIndex !== i &&
          i < length - 1 &&
          positionY >= this.themeTopsYs[i] &&
          positionY < this.themeTopsYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }

      // 判断bsckTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // if (
      //   this.currentIndex === 0 &&
      //   positionY >= this.themeTopsYs[0] &&
      //   positionY < this.themeTopsYs[1]
      // ) {
      //   this.$refs.navbar.currentIndex = this.currentIndex;
      //   this.currentIndex =1;
      // } else if (
      //   this.currentIndex >= 1 && this.currentIndex < 2 &&
      //   positionY >= this.themeTopsYs[1] &&
      //   positionY < this.themeTopsYs[2]
      // ) {
      //   this.$refs.navbar.currentIndex = this.currentIndex;
      //   this.currentIndex = 2;
      // } else if (
      //   this.currentIndex >= 2 && this.currentIndex < 3 &&
      //   positionY >= this.themeTopsYs[2] &&
      //   positionY < this.themeTopsYs[3]
      // ) {
      //   this.$refs.navbar.currentIndex = this.currentIndex;
      //   this.currentIndex = 3;
      // }else if (
      //   this.currentIndex >= 3 &&
      //   positionY >= this.themeTopsYs[3]
      // ) {
      //   this.$refs.navbar.currentIndex = this.currentIndex;
      // }
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车中
      this.$store.dispatch("addCart", product).then(res=> {
        // console.log(product);
        this.show = true;
        this.message = "加入购物车成功";

        // 通过定时器清除 弹框显示
        setTimeout(()=>{
          this.show = false;
          this.message = ""
        },1500)
        
      });
    },
  },
  created() {
    // 通过params方法获取保存当前路由的iid
    this.iid = this.$route.params.iid;

    // 1.根据iid获取详情数据,
    getDetail(this.iid).then((result) => {
      const data = result.result;
      // console.log(data);
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages);

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // console.log(this.goods);

      //   3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.获取商品详细信息
      this.goodsInfo = data.detailInfo;

      // 5.尺寸参数信息
      this.params = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 6.用户评论
      if (data.rate.cRate != 0) {
        this.comment = data.rate.list[0];
        // console.log(this.comment);
      }

      // 1.值不对  原因：this.$refs.params.$el没有渲染
      // this.themeTopYs=[];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);

      // 值也不对,原因:图片没有计算在内
      // this.$nextTick(()=>{
      //   // 根据最新的数据，对于的DOM是已经被渲染出来
      //   // 但是图片依然是没有加载完的(目前获取到的offsetTop不包含其中的图片)
      //   // offsetTop不对的时候,基本都是图片的问题
      // this.themeTopYs=[];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
      // })
    });

    //2.商品推荐
    getRecommend().then((res) => {
      this.recommends = res.data.list;
      // console.log(res);
      // console.log( this.recommends);
    });

    // 给getThemeTopY赋值(对 this.themeTopsYs赋值的操作进行防抖)
    // 可以不用，在detail-goods-info中做了判断
    // this.getThemeTopY = debounce(() => {
    //   this.themeTopsYs = [];
    //   this.themeTopsYs.push(0);
    //   this.themeTopsYs.push(this.$refs.param.$el.offsetTop);
    //   this.themeTopsYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopsYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopsYs);
    // },100);
  },
  mounted() {
    //使用混入方法抽出想同的部分--->mixins方法
    // // 监听GoodLostItem中的图片加载完成,解决可滚动区域的bug,防抖操作
    // const refresh = debounce(this.$refs.scroll.refresh, 300);
    // // 对监听事件进行保存
    // this.itemImgListener= () => {
    //   refresh(); //函数调用
    //   // console.log("----");
    //   }
    // bus.$on("itemImgLoad",this.itemImgListener);
  },
  unmounted() {
    bus.$off("itemImgLoad", this.itemImgListener);
    // console.log("hhh");
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh; /**视口高度 */
}

.detail-top {
  position: relative;
  z-index: 10;
  background-color: #fff;
}

.content {
  background-color: #fff;
  height: calc(100% - 44px - 58px);
}
</style>
