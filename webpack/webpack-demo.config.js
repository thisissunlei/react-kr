const webpack = require('webpack');
const path = require('path');


module.exports = {
    output: {
       path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    entry: {
        app: './src/app.js',
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/manifest.json'),
        }),
    ],
};

