const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    dll: ['react', 'react-dom','material-ui']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dll.js',
     library: 'dll',
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname,'dist','manifest.json'),
      name: 'dll',
      context:__dirname
    })
  ]
};