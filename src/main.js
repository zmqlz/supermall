import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store/store"

// 使用router
createApp(App).use(router).use(store).mount('#app')


// const num = 10;
// console.log(!1); false

// const list = [1, 1, 0, 1]
// console.log(list.every(item => item > -1));