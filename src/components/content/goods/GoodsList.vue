<!-- 商品列表 -->

<template>
  <div class="good-list">
    <goods-list-item
      v-for="(item, index) in goodsList"
      :key="index"
      :goods-item="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  name: "GoodsList",
  props: {
    goodsList: {
      type: Array,
      defaulet() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style scoped>
.good-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}
</style>
