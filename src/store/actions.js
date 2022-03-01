import { ADDCOUNTER, ADDTOCART } from "./mutation-type";

export default {
    addCart(context, payload) {
        // 普通写法
        // let oldProduct = null;
        // for (let item of state.cartList) {
        //     if (item.iid === payload.iid) {
        //         oldProduct = item;
        //     }
        // }

        // 简便写法
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        if (oldProduct) {
            context.commit(ADDCOUNTER, oldProduct)
        } else {
            payload.count = 1;
            context.commit(ADDTOCART, payload)
        }
    }

}