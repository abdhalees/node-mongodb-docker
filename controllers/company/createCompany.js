var Company = require('../../models/Company.model');

module.exports = function(req, res, next) {
  var body = req.body;
  body.name = body.displayName.toLowerCase();
  Company.create(body, function(err, company) {
    if (err && err.code === 11000) res.status(409).json({ err: 'name already exists' });
    if (err) return next(err);
    res.status(201).json(company);
  });
};
