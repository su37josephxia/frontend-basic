const fs = require('fs')
var http = require('http');

class UploadSourceMapWebpackPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    // 打包结束后执行
    compiler.hooks.done.tap("upload-sourcemap-plugin", status => {
      // 获取输出文件目录
      const path = status.compilation.outputOptions.path
      const sourceMapFileIncludes = [/\.map$/, /asset-manifest\.json/];
      // 读取sourcemap文件
      const list = fs.readdirSync(path)
      list
        .filter(file => sourceMapFileIncludes.some(regex => regex.test(file)))
        .forEach(fileName => {
          console.log('file', fileName)
          this.upload(this.options.uploadUrl, path, fileName)
        })
    });
  }
  upload(url, dir, file, apiKey) {
    const client = http.request(
      `${url}?name=${file}&key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-strean",
        }
      }
    )
    const stream = fs.createReadStream(`${dir}/${file}`)
    stream.pipe(client)
    stream.on('end', () => {
      client.end()
    })
    client.on('error', () => {
      console.log('source-map上传失败')
    })
  }
}

module.exports = UploadSourceMapWebpackPlugin;
