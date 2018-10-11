var mongoose = require('mongoose');
var CONFIG = require('./config');

mongoose.connect(
  CONFIG.database,
  { useNewUrlParser: true }
);

mongoose.connection.on('error', function(err) {
  console.log('connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected.');
});

module.exports = mongoose.connection;
