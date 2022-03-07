import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store/store"
import fastClick from "fastclick"
import lazyLoad from "vue3-lazy"

// 使用router
// createApp(App).use(router).use(store).mount('#app')
const app = createApp(App)
app.use(store)
app.use(router)

// 使用图片懒加载
app.use(lazyLoad, {
    loading: require("./assets/img/common/placeholder.png")
})

app.mount("#app")

// 解决移动端三秒延迟问题
fastClick.attach(document.body)




// const num = 10;
// console.log(!1); false

// const list = [1, 1, 0, 1]
// console.log(list.every(item => item > -1));