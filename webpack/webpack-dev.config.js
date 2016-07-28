const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), '/static');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;

const config = {
  // 程序入口
  entry:path.join(process.cwd(), '/src/app.js'),
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
    filename: 'bundle.js'
  },
  plugins: [

    // 开发时热加载组件
    new webpack.HotModuleReplacementPlugin(),

    // 错误提示但是不阻断编译
    new webpack.NoErrorsPlugin(),

	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(env)
	}),

	new ExtractTextPlugin('app.css', { allChunks: true }),

	new HtmlWebpackPlugin({
		title: 'Redux React Router Async Example',
		filename: 'index.html',
		template: 'index.template.html',
		inject:'body'
	})

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
