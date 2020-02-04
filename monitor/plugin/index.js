const { uploadSourceMaps, readDir } = require("./utils");

/**
 * @param {插件配置桉树} options
 */
function errorMonitorWebpackPlugin(options = {}) {
  this.options = options;
}

// 插件必须实现一个 apply 方法，这个会在 webpack 打包时被调用
errorMonitorWebpackPlugin.prototype = {
  /**
   * @param {编译实例对象} compiler
   */
  apply(compiler) {
    const { url, outputPath } = this.options;
    /**
     * compiler hook: done
     * 在打包结束时执行
     * 可以获取到访问文件信息的入口
     * https://webpack.js.org/api/compiler-hooks/#done
     */
    if (url && outputPath) {
      compiler.hooks.done.tap("upload-sourcemap-plugin", status => {
        // 读入打包输出目录，提取 source-map 文件
        const sourceMapPaths = readDir(outputPath);
        sourceMapPaths.forEach(p =>
          uploadSourceMaps({
            url: `${url}?fileName=${p.replace(outputPath, "")}`,
            sourceMapFile: p
          })
        );
      });
    }
  }
};

module.exports = errorMonitorWebpackPlugin;

