var Company = require('../../models/Company.model');

module.exports = function(req, res, next) {
  var company = req.params.company;
  var workspace = req.params.workspace;
  Company.count({ name: company }, function(err, result) {
    if (err) return next(err);
    if (result < 1) return res.status(400).json({ err: 'company does not exist' });
    Company.findOne({ name: company }, { workspaces: { $elemMatch: { name: workspace } } }, function(err, result) {
      if (err) return next(err);
      if (!result || !result.workspaces[0]) return res.status(400).json({ err: 'workspace does not exist' });
      res.status(200).json(result.workspaces[0]);
    });
  });
};
