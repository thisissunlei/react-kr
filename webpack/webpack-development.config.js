const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), '/static');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var env = process.env.NODE_ENV || 'development';

const config = {
	entry:{
		development:[
			 'webpack/hot/dev-server',
    		'webpack/hot/only-dev-server',
		],	
		app:path.join(process.cwd(), '/src/app.js')
	},
	resolve: {
		root:path.join(process.cwd(), '/src'),
		extensions: ['', '.js','.less'], 
		alias: {
			'kr-ui': path.join(process.cwd(), '/src/Components'), 
			'kr': path.join(process.cwd(), '/src'), 
		},
	},
  	devServer: {
	  contentBase: "./static",
	  hot:true,
	  port: 8001,
	  inline: true,
	  historyApiFallback: true,
	  colors: true,
	  stats: 'normal',
  },
	externals: { 
		React:true,
	}, 
	devtool: 'eval-source-map',
	output: {
		path: buildPath,
		filename: '[name].js',
		publicPath:"/"
	},
	noParse:['/node_modules/'],
	plugins:[

		new webpack.DllReferencePlugin({
             context:__dirname,
           	 manifest: require('./dist/manifest.json'),
           	 name:'lib'
        }),
	/*
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

		*/
		new webpack.optimize.MinChunkSizePlugin({
   			 compress: {
     			 warnings: false
    		}
  		}),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		}),
		new webpack.optimize.CommonsChunkPlugin({name:'common',filename:'common.js',chunks: ["app", "vendor"],minChunks: Infinity}),
		new ExtractTextPlugin({ filename: 'app.css', disable: false, allChunks: true }),
		new HtmlWebpackPlugin({
			title: '财务管理',
			filename: 'index.html',
			template: './src/index.template.html',
			inject:'body',
			hash:true,
			cache:false,
			showErrors:true,
			/*
			chunksSortMode:function(a,b){
				 if (a.names[0] > b.names[0]) {
       				 return 1;
     			 }
     			 if (a.names[0] < b.names[0]) {
        			return -1;
     			 }
     			 return 0;
			}
			*/
		}),
		new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
	],
	watch: true,
    keepalive: true,
    //displayErrorDetails:true,
    colors:true,
    hot:true,
    optimizeDebupe:true,
	module: {
		exprContextRegExp: /$^/,
		exprContextCritical: false,
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: [
					'babel-loader',
				],
				include: [
               		 path.join(process.cwd(), './src'),
              	],
				exclude: /(node_modules|bower_components|static|test|build|configs)/
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
		failOnWarning: true,
    	failOnError: true, 
    	cache: true
	},
};

module.exports = config;
