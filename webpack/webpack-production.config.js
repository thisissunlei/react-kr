const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), '/build');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	entry:{
		app:path.join(process.cwd(), '/src/app.js'),
		vender:[path.join(process.cwd(), '/node_modules/babel-polyfill/lib/index.js')],	
		development:[]
	},
	resolve: {
		extensions: ['', '.js', '.md'], // 加载这些类型的文件时不用加后缀
		alias: {
			'kr-ui': path.join(process.cwd(), '/src/Components'), 
			'kr': path.join(process.cwd(), '/src'), 
			// 'material-ui': path.resolve(__dirname, '../meterial-ui'),
		},
	},

	// 出口文件配置
	output: {
		path: buildPath,
		filename: '[name].js',
	},
	externals: { 
		React:true
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
		new webpack.optimize.CommonsChunkPlugin({name:'common', filename:'common.js'}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new ExtractTextPlugin({ filename: 'app.css', disable: false, allChunks: true }),
		new HtmlWebpackPlugin({
			publicPath: '/',
			title: '氪空间',
			filename: 'index.html',
			template: './src/index.template.html',
			inject:'body',
			inject:'body',
			hash:true,
			cache:true,
			showErrors:false
		}),
		new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
		new webpack.NoErrorsPlugin(),
		/*
	new TransferWebpackPlugin([
		{from: 'root/css', to: 'css'},
		{from: 'root/images', to: 'images'},
	], path.resolve(__dirname, 'src')),
	*/
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
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader"
			},
			{
				test: /\.css$/, 
				loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
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
