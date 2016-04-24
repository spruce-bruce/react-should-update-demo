var __HOSTNAME__ = process.env.HOST ? process.env.HOST : 'localhost';
var __APPTYPE__  = process.env.APP_TYPE || 'shared';

var autoprefixer      = require('autoprefixer');
var Webpack           = require('webpack');
var WebpackError      = require('webpack-error-notification');
var path              = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');

var environment = (process.env.APP_ENV || 'development');
var npmPath     = path.resolve(__dirname, 'node_modules');

var getBasePathAndPort = function (appType) {
  switch (appType) {
    case 'shared':
    case 'patternlib':
    case 'pattern-library':
    case 'pl':
      return { path: 'shared', port: 9000 };
    default:
      throw new Error(`Unknown app type: ${appType}`);
  }
};

var appBase = getBasePathAndPort(__APPTYPE__);
var appFolder = './' + appBase.path;
var __PORT__ = appBase.port;

var config      = {
  devtools: [],
  entries: {
    app: environment === 'development'
      ? [appFolder + '/bootstrap.js', 'webpack-hot-middleware/client?path=/__webpack_hmr?http://' + __HOSTNAME__ + ':' + __PORT__]
      : [appFolder + '/bootstrap.js'],
    media: [appFolder + '/media.js']
  },
  plugins: [
    new Webpack.DefinePlugin({
      __BACKEND__: process.env.BACKEND ? '\'' + process.env.BACKEND + '\'' : undefined,
      __ENVIRONMENT__: '\'' + environment + '\'',
      __HOSTNAME__: '\'' + __HOSTNAME__ + '\'',
      __APPTYPE__: '\'' + __APPTYPE__ + '\'',
      'process.env': {
        NODE_ENV: '\'' + environment + '\'',
      },
    }),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      favicon  : path.join(__dirname, 'static-media/icons/favicon.ico'),
      template: './' + appBase.path + '/index.html',
      inject: false
    }),
  ],
  reactLoaders: ['babel'],
  sassOptions: (
    '?outputStyle=' + (environment === 'production' ? 'compressed' : 'nested') +
    '&includePaths[]=' + npmPath
  ),
  styleOptions: '?insertAt=top'
};

if (environment !== 'production') {
  config.devtools = '#inline-source-map';

  config.plugins.push(
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin(),
    new ForceCaseSensitivityPlugin()
  );

  if (process.platform !== 'win32') {
    config.plugins.push(new WebpackError(process.platform));
  }
}

module.exports = [{
  name: 'app bundle',
  entry: config.entries.app,
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: npmPath,
      },
    ],
    loaders: [
      {
        test: /\.(eot|ico|ttf|woff|woff2|gif|jpe?g|png|svg)$/,
        loader: 'file-loader',
        exclude: npmPath,
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: npmPath,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: npmPath,
      },
      {
        test: /\.scss$/,
        loader: 'style' + config.styleOptions + '!css!postcss!sass' + config.sassOptions,
      }
    ],
  },
  plugins: config.plugins,
  postcss: function () {
    return [autoprefixer];
  },

  resolve: {
    alias: {
      shared: path.resolve('./shared')
    },
    extensions: ['', '.css', '.js', '.json', '.jsx', '.scss', '.webpack.js', '.web.js'],
  },
  devtool: config.devtools,
}, {
  name: 'media bundle',
  entry: config.entries.media,
  output: {
    filename: 'media.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: npmPath,
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: npmPath,
      },
      {
        test: /\.(eot|ico|ttf|woff|woff2|gif|jpe?g|png|svg)$/,
        loader: 'file-loader',
        exclude: npmPath,
      },
      {
        test   : /\.s?css$/,
        loader : 'style!css!postcss!sass' + config.sassOptions
      },
    ],
    plugins: [],
  },

  resolve: {
    alias: {
      shared: path.resolve('./shared')
    },
    extensions: ['', '.css', '.js', '.json', '.jsx', '.scss', '.webpack.js', '.web.js'],
  },
  devtool: config.devtools,
}];
