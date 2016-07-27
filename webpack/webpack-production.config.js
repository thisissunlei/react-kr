const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  // 程序入口
  entry: [
    path.join(__dirname, '/src/app/app.js'),
  ],
  // webpack 获取依赖配置
  resolve: {
    extensions: ['', '.js', '.md'], // 加载这些类型的文件时不用加后缀
    alias: {
      'kr-ui': path.resolve(__dirname, '../src'), // kr-ui 相关组件从源代码目录加载
    },
  },
  devtool: 'source-map',
  // dev server 配置
  devServer: {
    contentBase: 'build',
  },
  // 出口文件配置
  output: {
    path: buildPath,
    filename: 'app.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(__dirname, '/src/root/index.html'),
    }),
    // 错误提示但是不阻断编译
    new webpack.NoErrorsPlugin(),
    // 复制文件
    new TransferWebpackPlugin([
      {from: 'root/css', to: 'css'},
      {from: 'root/images', to: 'images'},
    ], path.resolve(__dirname, 'src')),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
    ],
  },
  eslint: {
    configFile: '../.eslintrc',
  },
};

module.exports = config;
