const glob = require('glob')
const path = require('path')

const fs = require('fs')
const http = require('http')
class UploadSourceMapWebPackPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        console.log('UploadSourceMapWebPackPlugin apply')
        // 定义在打包后执行
        compiler.hooks.done.tap('upload-sourecemap-plugin', async status => {
            // 读取sourcemap文件
            const list = glob.sync(path.join(status.compilation.outputOptions.path, `./**/*.{js.map,}`))
            // console.log('list:', list)
            for (let filename of list) {
                await this.upload(this.options.uploadUrl, filename)
            }
        })
    }
    upload(url, file) {
        return new Promise(resolve => {
            console.log('upload Map:', file)

            const req = http.request(
                `${url}?name=${path.basename(file)}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        Connection: 'keep-alive',
                        'Transfer-Encoding': 'chunked'
                    }
                }
            )
            fs.createReadStream(file)
                .on('data', chunk => {
                    req.write(chunk)
                })
                .on('end', () => {
                    req.end()
                    resolve()
                })
        })
    }

}
module.exports = UploadSourceMapWebPackPlugin