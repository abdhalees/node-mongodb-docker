var Company = require('../../models/Company.model');

module.exports = function(req, res, next) {
  var body = req.body;
  var company = req.params.company;
  Company.count({ name: company }, function(err, result) {
    if (err) return next(err);
    if (result < 1) return res.status(400).json({ err: 'company does not exist' });
    body.name = body.displayName.toLowerCase();
    Company.findOneAndUpdate(
      { name: company, 'workspaces.name': { $ne: body.name } },
      {
        $addToSet: { workspaces: body }
      },
      { new: true },
      function(err, result) {
        if (err) return next(err);
        if (!result) return res.status(400).json({ err: 'workspace name already exists' });
        res.status(201).json(result.workspaces[result.workspaces.length - 1]);
      }
    );
  });
};
