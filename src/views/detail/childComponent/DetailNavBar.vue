<template>
<!-- 导航栏 -->
  <nav-bar>
    <template v-slot:left>
      <div class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
    </template>
    <template #center>
      <div class="title">
        <div
          class="title-item"
          :class="{ active:  index === currentIndex}"
          v-for="(item, index) in titles"
          :key="index"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick', index);
      console.log(111);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
}

.title-item {
  flex: 1;
  font-size: 16px;
}

.back {
  margin-top: 12px;
}

.active {
  color: var(--color-high-text);
}
</style>
