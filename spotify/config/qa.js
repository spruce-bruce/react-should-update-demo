/* eslint-disable */
var backend;

backend = __BACKEND__ || '%QA_API_HOST%';

module.exports = {
  api: {
    port: 80,
  },
  proxy: {
    hostname: backend,
  },
};
