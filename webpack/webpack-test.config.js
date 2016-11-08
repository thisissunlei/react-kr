const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), '/webpack/dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV || 'test';

const config = {
	entry:{
		vender:[
			path.join(process.cwd(), '/node_modules/babel-polyfill/lib/index.js')
		],	
		app:path.join(process.cwd(), '/src/app.js'),
	},
	resolve: {
		extensions: ['', '.js', '.md','.css'], 
		alias: {
			'kr-ui': path.join(process.cwd(), '/src/Components'), 
			'kr': path.join(process.cwd(), '/src'), 
		},
	},
	externals: { 
		React:true
	}, 
	output: {
		path: buildPath,
		filename: '[name].js',
		publicPath:"./"
	},
	plugins: [
		new webpack.DllReferencePlugin({
             context:__dirname,
           	 manifest: require('./dist/manifest.json'),
           	 name:'dll'
        }),
	 	new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.AggressiveMergingPlugin({
    		  minSizeReduce: 1.5,
     		  moveToParents: true
 		 }),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
		}),
		new webpack.optimize.MinChunkSizePlugin({
   			 compress: {
     			 warnings: false
    		}
  		}),
		new ExtractTextPlugin({ filename: 'app.css', disable: false, allChunks: true }),
		new HtmlWebpackPlugin({
			title: '财务管理',
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
