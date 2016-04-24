global.__BACKEND__     = process.env.BACKEND;
global.__ENVIRONMENT__ = process.env.APP_ENV || 'development';
global.__HOSTNAME__    = process.env.HOST || 'localhost';
global.__APPTYPE__     = process.env.APP_TYPE || 'shared';

var getBasePathAndPort = function (appType) {
  switch (appType) {
    case 'shared':
    case 'patternlib':
    case 'pl':
    case 'pattern-library':
      return { path: 'shared', port: 9000 };
    default:
      throw new Error(`Unknown app type: ${appType}`);
  }
};

var appBase = getBasePathAndPort(__APPTYPE__);
var __PORT__ = appBase.port || 9000;

var path             = require('path');
var request          = require('request');
var webpack          = require('webpack');
var appConfig        = require('./config');
var webpackConfig    = require('./webpack.config');
var proxy            = require('express-http-proxy');
var express          = require('express');
var url              = require('url');

var app        = express();
var compiler   = webpack(webpackConfig);
var publicPath = webpackConfig[0].output.publicPath;


if (!appConfig.api.prefix) {
  throw new Error('API prefix not set in configuration');
}

if (!appConfig.proxy.hostname) {
  throw new Error('API proxy hostname not set in configuration');
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.use(appConfig.api.prefix, proxy('https://' + appConfig.proxy.hostname, {
  limit: '50mb',
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  },
}));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: publicPath,
  contentBase: path.resolve(__dirname, 'build/' + appBase.path),
  hot: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(function (req, res, next) {
  var urlPath = url.parse(req.url).pathname;
  var ext = path.extname(urlPath);

  if ((ext === '' || ext === '.html') && req.url !== '/') {
    req.pipe(request('http://' + req.hostname + ':' + __PORT__)).pipe(res);
  } else {
    next();
  }
});

app.listen(__PORT__, function (err, result) {
  if (err) {
    console.log(err);
    return null;
  }

  console.log('Listening at localhost:' + __PORT__);
});
