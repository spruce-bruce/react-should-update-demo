/* globals __dirname, console */
'use strict';
var WebpackDevServer = require('webpack-dev-server');
var webpack          = require('webpack');
var path             = require('path');
var request          = require('request');
var config           = require('./webpack.config');

var server = new WebpackDevServer(webpack(config), {
    contentBase : path.resolve(__dirname + '/../test'),
    hot         : true,
    noInfo      : true
});

server.use(function (req, res, next) {
    var ext = path.extname(req.url);


    if ((ext === '' || ext === '.html') && req.url !== '/') {
        req.pipe(request('http://localhost:9999')).pipe(res);
    } else {
        next();
    }
});

server.listen(9999, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:9999');
});
