const path = require('path');
//引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// dist清理
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  devtool: 'source-map', // SourceMap,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};