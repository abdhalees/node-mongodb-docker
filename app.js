var express = require('express');
var bodyParser = require('body-parser');
var controllers = require('./controllers');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', controllers);
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json(err);
});

app.set('port', process.env.PORT || 3000);
module.exports = app;
