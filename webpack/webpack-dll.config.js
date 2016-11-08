const path = require('path');
const webpack = require('webpack');

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
    })
  ]
};