import { debounce } from "./utlis"
import bus from "@/bus"

import BackTop from "components/content/backTop/BackTop";

// 混入(methods,components也可以混入)
// 不可以将methods中方法的一部分放在混入中否则会被覆盖,生命周期函数里可以
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        // 监听GoodLostItem中的图片加载完成,解决可滚动区域的bug,防抖操作
        const refresh = debounce(this.$refs.scroll.refresh, 300);

        // 对监听事件进行保存
        this.itemImgListener = () => {
            refresh(); //函数调用
            // console.log("----");
        }
        bus.$on("itemImgLoad", this.itemImgListener);
        // console.log("我混入了");
    }
}


//将回到顶部的箭头进行混入
export const backTop = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.ScrollTo(0, 0);
        },


    }
}