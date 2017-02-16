const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), '/dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
	entry:{
		app:path.join(process.cwd(), '/src/app.js'),
	},
	resolve: {
		extensions: ['', '.js', '.md'], // 加载这些类型的文件时不用加后缀
		alias: {
			'kr-ui': path.join(process.cwd(), '/src/Components'),
			'kr': path.join(process.cwd(), '/src'),
		},
	},
	// 出口文件配置
	output: {
		path: buildPath,
		filename: 'scripts/[name].[chunkhash].js',
	},
	externals: {
		React:true
	},
	plugins: [

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			}
		}),
		new webpack.DllReferencePlugin({
             context:__dirname,
						 manifest:require(path.resolve(buildPath,'manifest.json')),
           	 name:'lib'
    }),

    new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
        drop_console: true,
        drop_debugger: true,
			},
			output: {
				comments: false,
			},
		}),

	 	new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin({
    		  minSizeReduce: 1.5,
     		  moveToParents: true
 		 }),
		new webpack.optimize.MinChunkSizePlugin({
   			 compress: {
     			 warnings: false,
    			drop_debugger: true,
    			drop_console: true
    		},
    		minChunkSize: 10000
  		}),
  		new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
		new ExtractTextPlugin({ filename: 'styles/app.css', disable: false, allChunks: true }),
		new HtmlWebpackPlugin({
			publicPath: '/',
			title: '氪空间后台管理系统',
			filename: 'index.html',
			template: './src/index.template.html',
			inject:'body',
			hash:true,
			cache:true,
			showErrors:true,
			chunksSortMode:'none'
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
				loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?minimize' })
			},
			{
				test: /\.less$/,
				 loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?minimize!less-loader' })
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file?name=images/[name].[hash].[ext]'
			},
			{
				test: /\.eot/,
				loader : 'file?prefix=font/&name=font/[name].[hash].[ext]'
			},
			{
				test: /\.woff/,
				loader : 'file?prefix=font/&limit=10000&mimetype=application/font-woff&name=font/[name].[hash].[ext]'
			},
			{
				test: /\.ttf/,
				loader : 'file?prefix=font/&name=font/[name].[hash].[ext]'
			},
			{
				test: /\.svg/,
				loader : 'file?prefix=font/&name=font/[name].[hash].[ext]'
			}
		],
	},

};

module.exports = config;
