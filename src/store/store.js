// 解决vue3中的store的使用
import { createStore } from 'vuex'

// 代码的提取
import mutations from "./mutations"
import actions from "./actions"
import getters from './getters'

const state = {
    cartList: []
}

// 2.创建store对象~
const store = createStore({
    state,
    mutations,
    actions,
    getters

})



// 3.传出store,挂载到vue实例中
export default store;