// 解决无法使用ues方法安装router:第一步  router版本要是4.x
import { createRouter, createWebHashHistory } from 'vue-router'


// 懒加载
const Home = () =>
    import ("views/home/Home")
const Category = () =>
    import ("views/category/Category")
const Profile = () =>
    import ("views/profile/Profile")
const ShopCart = () =>
    import ("views/shopcart/Shopcart")
const Detail = () =>
    import ("views/detail/Detail")

const routes = [{
        path: "",
        redirect: "/home"
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: "/category",
        component: Category
    },
    {
        path: "/shopCart",
        component: ShopCart
    },
    {
        path: "/profile",
        component: Profile
    },
    {
        path: "/detail/:iid",
        component: Detail
    }
]

// 解决无法使用ues方法安装router:第二步
const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL), //process.env.BASE_URL
    routes
    // mode: 'history'
})

export default router