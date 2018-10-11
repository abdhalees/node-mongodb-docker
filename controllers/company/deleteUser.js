var Company = require('../../models/Company.model');

module.exports = function(req, res, next) {
  var body = req.body;
  var company = req.params.company;
  var workspace = req.params.workspace;
  var email = req.query.email;
  Company.count({ name: company }, function(err, result) {
    if (err) return next(err);
    if (result < 1) return res.status(400).json({ err: 'company does not exist' });
    Company.findOneAndUpdate(
      { name: company, 'workspaces.name': workspace },
      {
        $pull: { 'workspaces.$.users': { email: email } }
      },
      { new: true },
      function(err, result) {
        if (err) return next(err);
        res.status(204).json(result);
      }
    );
  });
};
