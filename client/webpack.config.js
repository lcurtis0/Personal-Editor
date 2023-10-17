const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// ------------------------------------
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');


// Configure workbox plugins for a service worker and manifest file.
// Also added CSS loaders and babel to webpack.

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
      publicPath: './',
    },
    optimization: {
      runtimeChunk: 'single',
    },
    plugins: [
      // This plugin auto matically adds an index.html file with a script to bundle.js in dist folder
      // This plugin claims adds new service workers to stay and rids of all old service workers
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin'
      }),
      // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
      new MiniCssExtractPlugin(),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      new WebpackPwaManifest({
        name: 'JATE',
        short_name: 'JATE',
        description: 'Text editor',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('src', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
