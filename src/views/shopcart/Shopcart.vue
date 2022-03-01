<template>
  <div id="navbar">
    <!-- 导航栏 -->
    <nav-bar class="shopcart">
      <template #center>
        <div>购物车({{ length }})</div>
      </template>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list></cart-list>
    <!-- 底部的汇总 -->
    <cart-button-bar />
  </div>
</template>

<script>
import cartList from "./cartComponents/cartList.vue";
import cartButtonBar from "./cartComponents/cartButtonBar.vue"

import NavBar from "components/common/navbar/NavBar";

// 辅助函数mapGetters(仅仅将store中的getters映射到局部计算属性中)
import { mapGetters } from "vuex";

export default {
  name: "shopCart",
  components: {
    NavBar,
    cartList,
    cartButtonBar,
  },
  computed: {
    // 第一种写法：数组---->名字与getters的名字一致
    // ...mapGetters(["cartLength"])

    // 第二种写法：对象---->可以与名字与getters的名字不一致
    ...mapGetters({
      length: "cartLength",
      list:"cartList"
    }),
  },
  methods:{
   
  }
};
</script>

<style scoped>
.navbar {
  height: 100vh;
}

.shopcart {
  height: 44px;
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
