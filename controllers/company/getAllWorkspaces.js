var Company = require('../../models/Company.model');

module.exports = function(req, res, next) {
  var company = req.params.company;
  Company.count({ name: company }, function(err, result) {
    if (err) return next(err);
    if (result < 1) return res.status(400).json({ err: 'company does not exist' });
    Company.findOne(
      { name: company },
      {
        workspaces: 1
      },
      function(err, result) {
        if (err) return next(err);
        res.status(200).json(result.workspaces);
      }
    );
  });
};
