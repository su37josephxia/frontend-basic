const path = require("path");
const EmWebpackPlugin = require("error-monitor-webpack-plugin");

const pathResolve = p => path.join(process.cwd(), p);

module.exports = function override(config) {
  //do some stuff with the webpack config...
  config.plugins.push(
    new EmWebpackPlugin({
      url: "localhost:5000/sourcemap/upload", // 后端上传 source-map 接口
      outputPath: config.output.path // 打包 output 路径
    })
  );

  return config;
};
