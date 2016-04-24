/* eslint-disable */
var merge = require('lodash/merge');
var defaults;
var config;

defaults = {
  api: {
    // jscs:disable
    client_id: '123',// eslint-disable-line
    // jscs:enable
    hostname: __HOSTNAME__,
    port: 9000,
    prefix: '/api',
  },
  proxy: {
    hostname: __BACKEND__,
  },
};

// __ENVIRONMENT__ is replaced by webpack during build
switch (__ENVIRONMENT__) {
  case 'ci':
    config = require('./config/ci');
    break;
  case 'development':
    config = require('./config/development');
    break;
  case 'qa':
    config = require('./config/qa');
    break;
  case 'production':
    config = require('./config/production');
    break;
  default:
    throw new Error('Invalid ENVIRONMENT value: ' + __ENVIRONMENT__);
}

module.exports = merge({}, defaults, config);
