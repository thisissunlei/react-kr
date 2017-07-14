const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HappyPack = require('happypack');
const Envs = require(path.join(process.cwd(), 'src', 'Configs', 'Envs'));

const node_modules_dir = path.join(process.cwd(), 'node_modules');

var env = process.env.NODE_ENV || 'development';

console.log('=== 所在环境 ===\n', env, Envs.test);

const config = {
	entry: {
		page_app: [
			'webpack/hot/dev-server',
			'webpack/hot/only-dev-server',
			path.join(process.cwd(), '/src/Page/App/index.js'),
		],
		page_login: path.join(process.cwd(), '/src/Page/Login/index.js')
	},
	resolve: {
		extensions: ['', '.js', '.less', '.png', '.jpg', '.svg'],
		alias: {
			'kr-ui': path.join(process.cwd(), '/src/Components'),
			'kr': path.join(process.cwd(), '/src'),
			'redux': path.join(node_modules_dir, 'redux'),
			'react-redux': path.join(node_modules_dir, 'react-redux'),
			'mobx': path.join(node_modules_dir, 'mobx'),
			'mobx-react': path.join(node_modules_dir, 'mobx-react'),
			'react-router': path.join(node_modules_dir, 'react-router'),
			'material-ui': path.join(node_modules_dir, 'material-ui'),
			'lodash': path.join(node_modules_dir, 'lodash')
		},
	},
	devServer: {
		contentBase: buildPath,
		devtool: 'eval',
		hot: true,
		inline: true,
		port: 8001,
		outputPath: buildPath,
		 disableHostCheck: true,
		proxy: {
			'/api': {
				target: Envs[process.env.NODE_ENV],
				changeOrigin: true
			}
		}
	},
	externals: {
		React: true,
	},
	output: {
		path: buildPath,
		filename: 'scripts/[name].js',
		chunkFilename: 'scripts/[name].js',
		publicPath: "/"
	},
	noParse: ['/node_modules/'],
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HappyPack({
			id: 'jsx',
			threadPool: HappyPack.ThreadPool({ size: 6 }),
			loaders: ['babel-loader?cacheDirectory=true'],
			verbose: false
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		}),
		new HtmlWebpackPlugin({
			title: '氪空间后台管理系统',
			filename: 'index.html',
			template: './src/Page/App/index.template.html',
			inject: 'body',
			excludeChunks: ['page_login'],
			cache: true,
			showErrors: true,
		}),
		new HtmlWebpackPlugin({
			title: '登录-氪空间后台管理系统',
			filename: 'login.html',
			template: './src/Page/Login/index.template.html',
			excludeChunks: ['page_app'],
			inject: 'body',
			cache: false,
			showErrors: true,
		}),
		new CopyWebpackPlugin([
			{ from: path.join(process.cwd(), 'public', 'vendors'), to: path.join(process.cwd(), 'dist', 'vendors') }
		])
	],
	module: {
		exprContextRegExp: /$^/,
		exprContextCritical: false,
		/*
		preLoaders: [
     {
       test: /\.js$/,
       loader: 'eslint-loader',
			 exclude: /(node_modules|bower_components|static|test|build|configs)/,
			 include: [ path.join(process.cwd(), './src')]
     },
   ],
	 */
		loaders: [
			{
				test: /\.js?$/,
				loaders: [
					'happypack/loader?id=jsx'
				],
				include: [path.join(process.cwd(), './src')],
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
				loader: 'file?prefix=font/'
			},
			{
				test: /\.woff/,
				loader: 'file?prefix=font/&limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.ttf/,
				loader: 'file?prefix=font/'
			},
			{
				test: /\.svg/,
				loader: 'file?prefix=font/'
			}
		],
	},
	eslint: {
		configFile: path.join(process.cwd(), '.eslintrc'),
		failOnWarning: false,
		failOnError: false,
		cache: true,
		hot: true,
		historyApiFallback: true
	},
};

module.exports = config;
