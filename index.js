var app = require('./app');
var dbConnection = require('./config/database');

dbConnection.once('open', function() {
  console.log('connected to database');
  app.listen(app.get('port'), function() {
    console.log('app running on: ' + app.get('port'));
  });
});
