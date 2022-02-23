import { debounce } from "./utlis"
import bus from "@/bus"

// 混入(methods,components也可以混入)
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