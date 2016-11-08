const path = require('path');
const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    lib: [
      'react', 
      'react-dom',
      'material-ui',
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'lib.js',
    library: 'lib',
  },
  plugins: [
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