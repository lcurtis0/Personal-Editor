const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // The output is to send the script in the index.html in dist. This can cahnge by filename
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // This plugin auto matically adds an index.html file with a script to bundle.js in dist folder
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin'
      })
    ],

    module: {
      rules: [
        
      ],
    },
  };
};
