/* eslint-disable */
var backend = __BACKEND__ || '%DEV_API_HOST%';

module.exports = {
  proxy: {
    hostname: backend,
  },
};
