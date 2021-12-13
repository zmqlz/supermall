import axios from "axios";

export function request(config) {

    // 1.创建实例对象
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/hy66',
        timeout: 5000
    });

    // 2.axios拦截器
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(config => {
        // 请求成功拦截
        // console.log(config);
        // 作用1：比如config中的一些信息不符合服务器的要求
        // 作用2: 比如每次发送网络请求时,都希望在界面上显示一个请求的图标
        // 作用3: 某些网络请求必须携带一些特殊的信息
        return config //一定要返回出去,否则无法请求到
    }, err => {
        // 请求成功拦截
        console.log(err);
    })

    // 2.2.响应拦截的作用
    instance.interceptors.response.use(result => {
        // 响应成功拦截
        // console.log(result);

        return result.data //一定要返回出去,否则无法请求到
    }, err => {
        // 响应失败拦截
        console.log(err);
    })

    // 最最终写法(请求数据)
    return instance(config) //返回的是一个Promise
}