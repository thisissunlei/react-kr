const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), '/static');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;

const config = {
  entry:[
	  path.join(process.cwd(), '/static/components/normalize-css/normalize.css'),
	  path.join(process.cwd(), '/src/app.js'),
  ],
  resolve: {
    extensions: ['', '.js', '.md','.css'], 
    alias: {
      'kr-app': path.join(process.cwd(), '/src'), 
    },
  },
  devtool: 'eval',
  output: {
	  path: buildPath,
	  filename: 'bundle.js',
	  publicPath:"http://127.0.0.1:8001/static/"
  },
  plugins: [

	  new webpack.HotModuleReplacementPlugin(),

	  new webpack.NoErrorsPlugin(),

	  new webpack.DefinePlugin({
		  'process.env.NODE_ENV': JSON.stringify(env)
	  }),
	  /*
	  new ExtractTextPlugin('app.css', { allChunks: true }),
	  new HtmlWebpackPlugin({
		  title: 'Redux React Router Async Example',
		  filename: 'index.html',
		  template: 'index.template.html',
		  inject:'body'
	  })
	  */
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
	  ],
  }
};

module.exports = config;
