const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const webpack = require('webpack');


// Configure workbox plugins for a service worker and manifest file.

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

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      //webpack-pwa-manifest is a webpack plugin that generates a 'manifest.json' for your Progressive Web Application, with auto icon resizing and fingerprinting support.
      new WebpackPwaManifest({
        name: 'JATE Text Editor',
        short_name: 'JATE',
        description: 'Text editor for the browser',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        fingerprints: true,
        start_url: './',
        publicPath: './',
        // Inject ensures proper configuration for the "start_url" and "publicPath" parameters.
        inject: true,
        icons: [
          {
            src: path.resolve('client/src/images/logo.png'),
            // This gives options to multiple sizes upon shinking the window
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
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
