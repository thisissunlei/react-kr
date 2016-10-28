const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), '/static');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV || 'development';

const config = {
	entry:[
		path.join(process.cwd(), '/node_modules/babel-polyfill/lib/index.js'),
		path.join(process.cwd(), '/src/app.js'),
	],
	resolve: {
		extensions: ['', '.js', '.md','.css'], 
		alias: {
			'kr-ui': path.join(process.cwd(), '/src/Components'), 
			'kr': path.join(process.cwd(), '/src'), 
		},
	},
	/*
  devServer: {
	  contentBase: "./static",
	  port: 8001,
	  inline: true,
	  historyApiFallback: true,
	  colors: true,
	  stats: 'normal',
  },
  */
	devtool: 'eval-source-map',
	output: {
		path: buildPath,
		filename: 'bundle.js',
		publicPath:"/"
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		}),
		new webpack.optimize.CommonsChunkPlugin({name:'common', filename:'common.js'}),
		new ExtractTextPlugin({ filename: 'app.css', disable: false, allChunks: true }),
		new HtmlWebpackPlugin({
			title: '氪空间',
			filename: 'index.html',
			template: './src/index.template.html',
			inject:'body'
		}),
		new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop')
	],
	module: {
		exprContextRegExp: /$^/,
		exprContextCritical: false,
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [
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
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file?name=[name].[ext]?[hash]'
			},
			{
				test: /\.eot/,
				loader : 'file?prefix=font/'
			},
			{
				test: /\.woff/,
				loader : 'file?prefix=font/&limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.ttf/,
				loader : 'file?prefix=font/'
			}, 
			{
				test: /\.svg/,
				loader : 'file?prefix=font/'
			}
		],
	},
	eslint: {
		configFile: '../.eslintrc',
	},
};

module.exports = config;
