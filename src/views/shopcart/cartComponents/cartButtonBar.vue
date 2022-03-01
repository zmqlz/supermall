<template>
  <div class="cart-buttom-bar">
    <div class="check">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="isUnCheckAll"
      />
      <span>全选</span>
    </div>

    <div class="price">合计{{ totalPrice }}</div>

    <div class="calculate">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "cartbuttonbar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "¥" +
        this.cartList
          .filter((item) => {
            //   filter() 方法返回符合一定条件的元素。
            //   该方法让您规定一个条件。不符合条件的元素将从选择中移除，符合条件的元素将被返回。
            return item.checked;
          })
          .reduce((preValue, item) => {
            // reduce()方法接收一个函数作为累加器，
            //数组中的每个值（从左到右）开始缩减，最终计算为一个值
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2) //toFixed() 保留几位小数
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() { //判断是否全选
      if (this.cartList.length === 0) return false;
      // return (this.cartList.filter(item => item.checked).length)

      // return !this.cartList.find(item => !item.checked) // 找到一个不为true的就是false

      return this.cartList.every((item) => item.checked); // 只要有一个为false就是false

      // 遍历的方法
      // for(let item of this.cartList) {
      //     if(!item.checked) {
      //         return false
      //     };

      //     return true
      // }
    },
  },
  methods: {
    isUnCheckAll() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      }else {
          this.cartList.forEach(item => item.checked = true)
      }
    },
  },


};
</script>

<style scoped>
.cart-buttom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
}

.check {
  display: flex;
  align-items: center;
  width: 90px;
}

.check-button {
  width: 25px;
  height: 25px;
  line-height: 25px;
  margin-right: 5px;
  margin-left: 15px;
}

.price {
  flex: 1;
  margin-left: 20px;
  text-align: center;
}

.calculate {
  width: 90px;
}
</style>