const fs = require('fs')
var http = require('http');



class UploadSourceMapWebpackPlugin {
  constructor(options) {
    console.log('uploadSourceMap....constructor', options)
    this.options = options
  }

  apply(compiler) {
    // 打包结束后执行
    compiler.hooks.done.tap("upload-sourcemap-plugin", status => {

      const path = status.compilation.outputOptions.path

      console.log('path', path)
      const sourceMapFileIncludes = [/\.map$/, /asset-manifest\.json/];
      const list = fs.readdirSync(path)
      list
        .filter(file => sourceMapFileIncludes.some(regex => regex.test(file)))
        .forEach(fileName => {
          console.log('file', fileName)
          this.upload(this.options.uploadUrl, path, fileName)
        })
      // 读入打包输出目录，提取 source-map 文件
      // const sourceMapPaths = readDir(outputPath);
      // sourceMapPaths.forEach(p =>
      //   uploadSourceMaps({
      //     url: `${url}?fileName=${p.replace(outputPath, "")}`,
      //     sourceMapFile: p
      //   })
      // );
    });
  }

  upload(url, dir,file, apiKey) {
    const client = http.request(
      `${url}?name=${file}&key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-strean",
          // Connection: "keep-alive",
          // "Transfer-Encoding": "chunked",
          // 'apikey':''
        }
      }
    )
    const stream = fs.createReadStream(`${dir}/${file}`)
    stream.pipe(client)
    stream.on('end',() => {
      client.end()
    })
    client.on('error',() => {
      console.log('source-map上传失败')
    })
  }

}

module.exports = UploadSourceMapWebpackPlugin;
