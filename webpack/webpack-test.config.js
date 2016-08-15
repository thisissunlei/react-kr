const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(process.cwd(), '/static/build');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;

var appConfig = require('../configs/config');

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
	  publicPath:"http://127.0.0.1:"+appConfig.app.port+"/build"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
		  NODE_ENV: JSON.stringify('production'),
	  },
	}),
    new webpack.NoErrorsPlugin(),
	new ExtractTextPlugin('app.css', { allChunks: true }),
	new HtmlWebpackPlugin({
		title: 'dehahahmo',
		filename: 'index.html',
		template: 'index.template.html',
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
	  ],
  }
};

module.exports = config;
