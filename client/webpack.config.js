const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// ------------------------------------
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // This is involved with webpack-dev-server
    // This is a depenacy that if you change any of your source files in the directory it will automatically reload them
    // Meaning theres always a new output so that you don't have to do a npm run build for every change
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
    },
    // The output is to send the script in the index.html in dist. This can cahnge by filename
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      runtimeChunk: 'single',
    },
    plugins: [
      // This plugin auto matically adds an index.html file with a script to bundle.js in dist folder
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin'
      }),

      // Need more plugins 

      new webpack.BannerPlugin({
        banner: (yourVariable) => {
          return `yourVariable: ${yourVariable}`;
        },
      }),
      // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
      new MiniCssExtractPlugin(),

      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'images/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
