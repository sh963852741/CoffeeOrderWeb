module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: '', //静态资源目录（js, css, img）
    lintOnSave: true, //是否开启eslint
    publicPath: '/CoffeeOrderWeb/',
    devServer: {
        proxy: {
            '/CoffeeOrderService/api': {
                target: 'http://localhost:8088/', //API服务器的地址
                /* http://106.13.201.225:8080/ */
                changeOrigin: true,
                pathRewrite: {
                    '^/CoffeeOrderService': '/CoffeeOrderService'
                }
            }
        }
    }
}