<template>
  <!-- 轮播图 -->
  <swiper>
    <!-- v-for 解决方法 后面跟:key="key" -->
    <swiper-item v-for="(item, key) in cbanners" :key="key">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "HomeSwiper",
  props: {
    cbanners: {
      type: Array,
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>
