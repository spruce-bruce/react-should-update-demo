global.__BACKEND__     = process.env.BACKEND;
global.__ENVIRONMENT__ = process.env.APP_ENV || 'development';
global.__HOSTNAME__    = process.env.HOST || 'localhost';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var path          = require('path');
var request       = require('request');
var webpack       = require('webpack');
var webpackConfig = require('./webpack.config');
var express       = require('express');

var app        = express();
var compiler   = webpack(webpackConfig);
var publicPath = webpackConfig.output.publicPath;

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath : publicPath,
    contentBase : path.resolve(__dirname, 'build'),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(function (req, res, next) {
    var ext = path.extname(req.url);

    if ((ext === '' || ext === '.html') && req.url !== '/') {
        req.pipe(request('http://' + req.hostname + ':9000')).pipe(res);
    } else {
        next();
    }
});

app.listen(9000, function (err, result) {
    if (err) {
        console.log(err);
        return null;
    }

    console.log('Listening at localhost:9000');
});
