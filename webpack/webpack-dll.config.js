const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const buildPath = path.join(process.cwd(), '/dist');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV || 'development';


const configs = {
  entry: {
    lib: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'mobx',
      'mobx-react',
      'react-router',
      'material-ui',
      'lodash',
    ]
  },
  output: {
    path: path.resolve(buildPath),
    filename: 'scripts/lib.js',
    library: 'lib',
  },
  plugins: [

    new CleanWebpackPlugin([path.resolve(buildPath)]),
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

    new webpack.DllPlugin({
      path: path.resolve(buildPath,'manifest.json'),
      name: 'lib',
      context:__dirname
    })
  ]
};

module.exports = configs;
