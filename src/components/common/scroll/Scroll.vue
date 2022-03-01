<!-- 要滑动有三个个个条件
      1.scroll必须要有高度
      2.最大的盒子必须也要有高度（100vh)   (高度尽量不要写为100%,有可能滑不动)
      3.scroll中只能有一个盒子
 -->

<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "BScrool",
  props: {
    probeType: 0,
    pullUpLoad: false,
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建better-scroll对象
    // console.log(this.$refs.wrapper);
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,    //为0时不触发  为1和2时,在可滚动区域一直触发, 当为3时,任何时候都触发
      click: true, //BetterScroll 默认会阻止浏览器的原生 click 事件,默认为false
      pullUpLoad: this.pullUpLoad,   //当为false不触发上拉加载事件,为true时触发
      useTransition: false, //是否使用 CSS3 transition 动画。如果设置为 false，则使用 requestAnimationFrame 做动画。
    }); //加分号没有用

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    // 上拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("上拉加载更多",this.pullUpLoad)
        //console.log(this);
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    //   返回指定的位置
    ScrollTo(x, y, time = 2000) {
      // 判断scroll对象是否存在
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      //refresh:重新计算 BetterScroll
      this.scroll && this.scroll.refresh();
      // console.log("----");
    },
    getScrollY() {
      return this.scroll?this.scroll.y:0;
    }
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>

