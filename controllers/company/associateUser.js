var Company = require('../../models/Company.model');

module.exports = function(req, res, next) {
  var body = req.body;
  var company = req.params.company;
  var workspace = req.params.workspace;
  Company.count({ name: company }, function(err, result) {
    if (err) return next(err);
    if (result < 1) return res.status(400).json({ err: 'company does not exist' });
    Company.findOneAndUpdate(
      { name: company, 'workspaces.name': workspace, 'workspaces.users.email': { $ne: body.email } },
      {
        $addToSet: { 'workspaces.$.users': body }
      },
      { new: true },
      function(err, result) {
        if (err) return next(err);
        if (!result) return res.status(400).json({ err: 'user email already exists' });
        res.status(201).json(result.workspaces[0].users[result.workspaces[0].users.length - 1]);
      }
    );
  });
};
