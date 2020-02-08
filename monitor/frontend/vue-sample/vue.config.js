// 自动上传Map
UploadSourceMapWebpackPlugin = require('../plugin/uploadSourceMapWebPackPlugin')

module.exports = {
    configureWebpack: {
        // 添加自动上传sourcemap文件
        // plugins: [
        //     new UploadSourceMapWebpackPlugin({
        //         uploadUrl: 'http://localhost:7001/monitor/sourcemap',
        //         apiKey: 'kaikeba'
        //     })
        // ],
        
    },
    // 关闭eslint规则
    devServer: {
        overlay: {
            warnings: true,
            errors: true
        }
    },
    lintOnSave:false

}