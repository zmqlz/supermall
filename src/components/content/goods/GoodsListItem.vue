<!-- 商品列表 -->

<template>
  <div class="goods-item">
    <!-- @load  监听图片加载 v-lazy  图片懒加载 -->
    <img v-lazy="showImage" @load="imgLoad" @click="itemClick" />
    <div class="goods-info">
      <P>{{ goodsItem.title }}</P>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
import bus from "@/bus";

export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      // 将孙子的事件传给爷(Home)
      bus.$emit("itemImgLoad");  //第二种写法格式

      // 第一种写法格式(建议第一种)
      // if(this.$route.path.indexOf("./home")) {
      //   bus.$emit("itemImgLoad")
      // }else if (this.$route.path.indexOf("/detail")) {
      //    bus.$emit("itemImgLoad")
      // }
    },
    itemClick() {
      // 将点击照片的iid拼接给detail路由
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img; //位置调换会报错
    },
  },
  created() {
    // console.log(true || undefined.aaa);   
    // console.log(undefined.aaa || true);
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  /* font-size: 12px; */
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
  font-size: 16px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>