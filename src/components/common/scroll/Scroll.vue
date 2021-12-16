<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
    name:'BScrool',
    props:{
            probeType:0,
            pullUpLoad:false
    },
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
        // 1.创建better-scroll对象
        // console.log(this.$refs.wrapper);
       this.scroll=new BScroll(this.$refs.wrapper,{
           probeType:this.probeType,
           click:true,  //BetterScroll 默认会阻止浏览器的原生 click 事件,默认为false
           pullUpLoad:this.pullUpLoad
       })  //加分号没有用
       
        // 2.监听滚动的位置
        this.scroll.on("scroll",position=>{
            // console.log(position);
            this.$emit("scroll",position)
        })

        // 上拉加载更多
        this.scroll.on("pullingUp",()=>{
            // console.log("上拉加载更多",this.pullUpLoad)
            this.$emit("pullingUp")  
        })
    },
    methods:{
        ScrollTo(x,y,time=2000) {
            this.scroll.scrollTo(x,y,time)
        },
        finishPullUp() {
            this.scroll.finishPullUp()
        }
    }
}
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }
</style>