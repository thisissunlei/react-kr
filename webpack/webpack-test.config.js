const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), '/dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const node_modules_dir = path.join(process.cwd(),'node_modules');
const HappyPack = require('happypack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var env = process.env.NODE_ENV || 'production';

const config = {
	entry:{
		app:path.join(process.cwd(), '/src/app.js'),
	},
	resolve: {
		extensions: ['', '.js', '.md','.css','.png','.svg'],
		alias: {
			'kr-ui': path.join(process.cwd(), '/src/Components'),
			'kr': path.join(process.cwd(), '/src'),
			'redux':path.join(node_modules_dir,'redux'),
			'react-redux':path.join(node_modules_dir,'react-redux'),
			'mobx':path.join(node_modules_dir,'mobx'),
			'mobx-react':path.join(node_modules_dir,'mobx-react'),
			'react-router':path.join(node_modules_dir,'react-router'),
			'material-ui':path.join(node_modules_dir,'material-ui'),
			'lodash':path.join(node_modules_dir,'lodash'),
		},
	},
	output: {
		path: buildPath,
		filename: 'scripts/[name].[chunkhash].js',
		publicPath:"./"
	},
	plugins: [

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			}
		}),
		new HappyPack({
			 id: 'jsx',
			 threadPool: HappyPack.ThreadPool({ size: 6 }),
   			 loaders: [ 'babel-loader?cacheDirectory=true' ],
   			 verbose: false,
   			 cache:true
  		}),
		new webpack.DllReferencePlugin({
						 context:__dirname,
						 manifest:require(path.resolve(buildPath,'manifest.json')),
						 name:'lib'
		}),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: true,
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
		new ExtractTextPlugin({ filename: 'app.css', disable: false, allChunks: true }),
		new HtmlWebpackPlugin({
			title: '氪空间后台管理系统',
			filename: 'index.html',
			template: './src/index.template.html',
			inject:'body',
			hash:true,
			cache:true,
			showErrors:true,
			chunksSortMode:'none'
		}),
		new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
		new CopyWebpackPlugin([
			{from:path.join(process.cwd(),'public','scripts'),to:path.join(process.cwd(),'dist','scripts')}
		]),
		new CopyWebpackPlugin([
			{from:path.join(process.cwd(),'public','images'),to:path.join(process.cwd(),'dist','images')}
		]),
		new CopyWebpackPlugin([
			{from:path.join(process.cwd(),'public','styles'),to:path.join(process.cwd(),'dist','styles')}
		])
	],
	module: {
		exprContextRegExp: /$^/,
		exprContextCritical: false,
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [
					'happypack/loader?id=jsx'
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
				loader : 'file?prefix=font/[name].[hash].[ext]'
			},
			{
				test: /\.woff/,
				loader : 'file?prefix=font/&limit=10000&mimetype=application/font-woff&name=font/[name].[hash].[ext]'
			},
			{
				test: /\.ttf/,
				loader : 'file?prefix=font/name=font/[name].[hash].[ext]'
			},
			{
				test: /\.svg/,
				loader : 'file?prefix=font/name=font/[name].[hash].[ext]'
			}
		],
	},
	eslint: {
		configFile: '../.eslintrc',
		failOnWarning: true,
    	failOnError: true,
    	cache: true
	},
};

module.exports = config;
