require('env2')('./.env');

var config = function(env) {
  if (env === 'development') {
    return {
      database: process.env.DEVELOPMENT_DATABASE
    };
  } else if (env === 'test') {
    return {
      database: process.env.TEST_DATABASE
    };
  } else {
    return {
      database: process.env.DEVELOPMENT_DATABASE
    };
  }
};
module.exports = config(process.env.NODE_ENV);
