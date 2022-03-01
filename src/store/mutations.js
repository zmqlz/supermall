import { ADDCOUNTER, ADDTOCART } from "./mutation-type"

export default {
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每个方法尽可能完成的事件比较单一
    [ADDCOUNTER](state, payload) {
        payload.count++;
    },
    [ADDTOCART](state, payload) {
        // 购物选择按钮初始状态
        payload.checked = false;
        state.cartList.push(payload);
    }

}