<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <div>
        <cart-list-item
          v-for="(item, index) in cartList"
          :key="index"
          :product="item"
        />
      </div>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import cartListItem from "./cartListItem";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "cartlist",
  components: {
    Scroll,
    cartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 40px);
}

.content {
  height: 100%;
  overflow: hidden;
}

</style>