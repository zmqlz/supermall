<template>
  <div>
    <!-- 轮播图 -->
    <swiper>
      <!-- v-for 解决方法 后面跟:key="key" -->
      <swiper-item v-for="(item, key) in cbanners" :key="key">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
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
  data() {
    isShow: false;
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imgLoad() {
      if (!this.isShow) {
        this.$emit("swiperLoaded");
        this.isShow = true;
      }
    },
  },
};
</script>
