const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), 'dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HappyPack = require('happypack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const node_modules_dir = path.join(process.cwd(),'node_modules');


const config = {
	entry:{
		page_app:path.join(process.cwd(), '/src/Page/App/index.js'),
		page_login:path.join(process.cwd(), '/src/Page/Login/index.js')
	},
	resolve: {
		extensions: ['', '.js','.less','.png','.jpg','.svg'],
		alias: {
			'kr-ui': path.join(process.cwd(), '/src/Components'),
			'kr': path.join(process.cwd(), '/src'),
			'redux':path.join(node_modules_dir,'redux'),
			'react-redux':path.join(node_modules_dir,'react-redux/dist/react-redux.min'),
			'mobx':path.join(node_modules_dir,'mobx'),
			'mobx-react':path.join(node_modules_dir,'mobx-react'),
			'react-router':path.join(node_modules_dir,'react-router'),
			'material-ui':path.join(node_modules_dir,'material-ui'),
			'lodash':path.join(node_modules_dir,'lodash')
		},
	},
	// 出口文件配置
	output: {
		publicPath: "/new",
		path: buildPath,
		filename: 'scripts/[name].[chunkhash].js',
		chunkFilename: '/scripts/[name].[chunkhash:5].js',
	},
	externals: {
		React: true
	},
	plugins: [

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			}
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require(path.resolve(buildPath, 'vendors', 'manifest.json')),
			name: 'lib'
		}),

		new HappyPack({
			id: 'jsx',
			threadPool: HappyPack.ThreadPool({ size: 6 }),
			loaders: ['babel-loader?cacheDirectory=true'],
			verbose: false,
			cache: true
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
		//bug apply errors 
		//new webpack.optimize.DedupePlugin(),
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
		new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 }),
		new ExtractTextPlugin({ filename: 'styles/app.css', disable: false, allChunks: true }),
		new HtmlWebpackPlugin({
			title: '氪空间后台管理系统',
			filename: 'index.html',
			template: './src/Page/App/index.template.html',
			inject: 'body',
			excludeChunks: ['page_login'],
			hash: true,
			cache: true,
			showErrors: true,
			chunksSortMode: 'none',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
				minifyJS: true,
				minifyCSS: true
			}
		}),
		new HtmlWebpackPlugin({
			title: '登录-氪空间后台管理系统',
			filename: 'login.html',
			template: './src/Page/Login/index.template.html',
			excludeChunks: ['page_app'],
			inject: 'body',
			hash: true,
			cache: false,
			showErrors: false,
		}),
		new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, 'node-noop'),
		new CopyWebpackPlugin([
			{ from: path.join(process.cwd(), 'public', 'vendors'), to: path.join(process.cwd(), 'dist', 'vendors') }
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
				loader: 'style-loader!css-loader',
			},
			{
				test: /\.less$/,
				loader: "style-loader!css-loader!less-loader"
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file?name=/images/[name].[hash].[ext]'
			},
			{
				test: /\.eot/,
				loader: 'file?prefix=font/&name=/font/[name].[hash].[ext]'
			},
			{
				test: /\.woff/,
				loader: 'file?prefix=font/&limit=10000&mimetype=application/font-woff&name=/font/[name].[hash].[ext]'
			},
			{
				test: /\.ttf/,
				loader: 'file?prefix=font/&name=/font/[name].[hash].[ext]'
			},
			{
				test: /\.svg/,
				loader: 'file?prefix=font/&name=/font/[name].[hash].[ext]'
			}
		],
	},

};

module.exports = config;
