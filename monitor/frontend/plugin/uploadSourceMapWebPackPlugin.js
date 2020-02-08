const fs = require('fs')
const http = require('http')
const glob = require('glob')
const path = require('path')
class UploadSourceMapWebPackPlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        // 打包结束后执行
        compiler.hooks.done.tap("upload-sourcemap-plugin", status => {
            // 读取sourcemap文件
            const list = glob.sync(path.join(status.compilation.outputOptions.path, `./**/*.{js.map,}`))
            list.forEach(fileName => {
                this.upload(this.options.uploadUrl, fileName)
            })
        });
    }

    upload(url, file, apiKey) {
        const client = http.request(
            `${url}?name=${path.basename(file)}&key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-strean",
                }
            }
        )
        const stream = fs.createReadStream(file)
        stream.pipe(client)
        stream.on('end', () => {
            client.end()
        })
        client.on('error', () => {
            console.log('source-map上传失败')
        })
    }
}
module.exports = UploadSourceMapWebPackPlugin