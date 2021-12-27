export function debounce(fn, time) {
    // 防抖函数(可以避免图片重复请求)
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, time)
    }
}