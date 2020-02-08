// 自动上传Map
UploadSourceMapWebpackPlugin = require('../plugin/uploadSourceMapWebPackPlugin')

module.exports = {
    configureWebpack:{
        plugins:[
            new UploadSourceMapWebpackPlugin({
                uploadUrl: 'http://localhost:7001/monitor/sourcemap'
            })
        ],
    },
    

    // 关闭eslint
    devServer: {
        overlay: {
            warning: true,
            errors: true
        }
    },
    lintOnSave: false
}