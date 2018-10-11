var Company = require('../../models/Company.model');

module.exports = function(req, res, next) {
  var _id = req.params._id;
  Company.findOne({ _id: _id }, function(err, result) {
    if (err) return next(err);
    res.status(200).json(result);
  });
};
