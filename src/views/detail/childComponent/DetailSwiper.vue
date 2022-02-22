<template>
<!-- 轮播图 -->
  <div id="detail-swiper">
      <swiper class="swipers">
        <swiper-item v-for="(item, index) in topImages" :key="index">
          <img :src="item" alt="" />
        </swiper-item>
      </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper"; //可以省略不写index

export default {
  name: "detailseiper",
  props: {
    topImages: {
      type: Array,
      default: [],
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.swipers {
    height: 500px;
    overflow: hidden;
}
</style>