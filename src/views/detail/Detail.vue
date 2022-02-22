<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar class="detail-top" />
    <scroll class="content" ref="scroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages" />
      <!-- 商品介绍 -->
      <detail-base-info :goods="goods" />
      <!-- 商家信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品详细信息 -->
      <detail-goods-info :detail-info="goodsInfo" @imgLoad="DetailImgLoad" />
      <!-- 尺寸信息 -->
      <detail-param-info :param-info="params"/>
      <!-- 用户评论 -->
      <detail-comment-info :comment-info="comment" ref="comment"/>
      <!-- 商品推荐 -->
      <goods-list :goods-list="recommends" />
    </scroll>
  </div>
</template>

<script>

import DetailNavBar from "./childComponent/DetailNavBar";
import DetailSwiper from "./childComponent/DetailSwiper";
import DetailBaseInfo from "./childComponent/DetailBaseInfo";
import DetailShopInfo from "./childComponent/DetailShopInfo";
import DetailGoodsInfo from "./childComponent/DetailGoodsInfo";
import DetailParamInfo from "./childComponent/DetailParamInfo"
import DetailCommentInfo from "./childComponent/DetailCommentInfo"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList"

import { getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
import {itemListenerMixin} from "common/mixin"

export default {
  name: "detail",
  mixins:[itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      goodsInfo: {},
      params:{},
      comment:{},
      recommends:{}
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
  },
  methods: {
    DetailImgLoad() {
      this.$refs.scroll.refresh();
    },
  },
  created() {
    // 通过params方法获取保存当前路由的iid
    this.iid = this.$route.params.iid;

    // 1.根据iid获取数据
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

      //   3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.获取商品详细信息
      this.goodsInfo = data.detailInfo;

      // 5.尺寸参数信息
      this.params=new GoodsParam(data.itemParams.info,data.itemParams.rule)

      // 6.用户评论
      if(data.rate.cRate!=0) {
        this.comment=data.rate.list[0]
        // console.log(this.comment);
      }
    });
  
    //2.商品推荐
      getRecommend().then(res=>{
        this.recommends = res.data.list;
        console.log(res);
        console.log( this.recommends);
      })
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
    bus.$off("itemImgLoad",this.itemImgListener)
  }
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
  height: calc(100% - 44px);
}
</style>
