const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), '/static');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  // 程序入口
  entry:{
	  index:[path.join(process.cwd(), '/src/container/index.js')],
	  user:[path.join(process.cwd(), '/src/container/user.js')]
  },
  // webpack 获取依赖配置
  resolve: {
    extensions: ['', '.js', '.md','.css'], // 加载这些类型的文件时不用加后缀
    alias: {
      'kr-app': path.join(process.cwd(), '/src'), // kr-ui 相关组件从源代码目录加载
    },
  },
  devtool: 'eval',
  // 出口文件配置
  output: {
    path: buildPath,
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: path.join(process.cwd(), '/views/index.html'),
    }),
    // 开发时热加载组件
    new webpack.HotModuleReplacementPlugin(),
    // 错误提示但是不阻断编译
    new webpack.NoErrorsPlugin()
  ],
  module: {
	  loaders: [
		  {
			  test: /\.jsx?$/,
			  loaders: [
				  'react-hot',
				  'babel-loader',
			  ],
			  exclude: /(node_modules|bower_components)/
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
  }
};

module.exports = config;
