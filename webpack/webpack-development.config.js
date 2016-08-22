const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), '/static');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;

const config = {
  entry:[
	  path.join(process.cwd(), '/node_modules/babel-polyfill/lib/index.js'),
	  path.join(process.cwd(), '/src/app.js'),
  ],
  resolve: {
    extensions: ['', '.js', '.md','.css'], 
    alias: {
      'kr-ui': path.join(process.cwd(), '/src/Components'), 
	 // 'material-ui': path.resolve(__dirname, '../meterial-ui'),
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
  // devtool: 'eval',
  output: {
	  path: buildPath,
	  filename: 'bundle.js',
	  publicPath:"http://127.0.0.1:8001/"
  },
  plugins: [

	  new webpack.optimize.OccurenceOrderPlugin(),
	  new webpack.HotModuleReplacementPlugin(),
	  new webpack.NoErrorsPlugin(),

	  new webpack.DefinePlugin({
		  'process.env.NODE_ENV': JSON.stringify(env)
	  }),
	  new ExtractTextPlugin('app.css', { allChunks: true }),
	  new HtmlWebpackPlugin({
		  title: '36kr融资',
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
  }
};

module.exports = config;
