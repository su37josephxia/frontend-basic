const UploadSourceMapWebPackPlugin = require('../plugin/uploadSourceMapWebPackPlugin')

module.exports = {
    configureWebpack : {
        plugins:[
            new UploadSourceMapWebPackPlugin({
                uploadUrl: 'http://localhost:7001/monitor/sourcemap'
            })
        ]
    },

    // 关闭eslint
    devServer: {
        overlay: {
            warning: true,
            errors: true
        }
    }
}