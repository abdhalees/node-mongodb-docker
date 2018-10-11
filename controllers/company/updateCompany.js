var Company = require('../../models/Company.model');

module.exports = function(req, res, next) {
  var body = req.body;
  if (body.displayName && body.displayName.trim() !== '') body.name = body.displayName.toLowerCase();
  Company.count({ _id: body._id }, function(err, result) {
    if (err) return next(err);
    if (result < 1) return res.status(400).json({ err: 'company does not exist' });
    Company.findOneAndUpdate({ _id: body._id }, body, { new: true }, function(err, result) {
      if (err) return next(err);
      res.status(202).json(result);
    });
  });
};
