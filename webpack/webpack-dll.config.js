const path = require('path');
const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    lib: [
      'react',
      'react-dom',
      'material-ui',
      'lodash',
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'lib.js',
    library: 'lib',
  },
  plugins: [

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
      path: path.join(__dirname,'dist','manifest.json'),
      name: 'lib',
      context:__dirname
    }),
    new CopyWebpackPlugin([
            { from: path.join(__dirname,'dist','lib.js'), to: path.join(__dirname,'../static','lib.js') },
        ], {copyUnmodified: true})
  ]
};
