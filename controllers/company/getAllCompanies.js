var Company = require('../../models/Company.model');

module.exports = function(req, res, next) {
  Company.find({}, function(err, rows) {
    if (err) return next(err);
    res.status(200).json(rows);
  });
};
