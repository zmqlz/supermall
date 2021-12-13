// 配置路径别名

const path = require('path'); //引入path模块
function resolve(dir) {
    return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}

module.exports = {
    lintOnSave: false, //关闭eslint
    chainWebpack: config => {
        config.resolve.alias
            //set第一个参数：设置的别名，第二个参数：设置的路径
            .set('assets', ('@/assets'))
            .set('common', ('@/common'))
            .set('components', ('@/components'))
            .set('network', ('@/network'))
            .set('views', ('@/views'))

    }
}