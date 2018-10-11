var express = require('express');
var create = require('./createCompany');
var update = require('./updateCompany');
var getAll = require('./getAllCompanies');
var getById = require('./getCompanyById');
var createWorkspace = require('./createWorkspace');
var updateWorkspace = require('./updateWorkspace');
var getAllWorkspaces = require('./getAllWorkspaces');
var getWorkSpaceByName = require('./getWorkspaceByName');
var associateUser = require('./associateUser');
var deleteUser = require('./deleteUser');
var validators = require('./validators');
var validate = require('../../middlewares/validate');

var router = express.Router();

router.post('/', validate(validators.createSchema), create);
router.put('/', validate(validators.updateSchema), update);
router.get('/', getAll);
router.get('/:_id', validate(validators.getByIdSchema), getById);
router.post('/:company/workspace', validate(validators.createWorkspaceSchema), createWorkspace);
router.put('/:company/workspace', validate(validators.updateWorkspaceSchema), updateWorkspace);
router.get('/:company/workspace', validate(validators.getAllWorkspacesSchema), getAllWorkspaces);
router.get('/:company/workspace/:workspace', validate(validators.getWorkspaceByNameSchema), getWorkSpaceByName);
router.post('/:company/workspace/:workspace/user', validate(validators.associateUserSchema), associateUser);
router.delete('/:company/workspace/:workspace/user', deleteUser);

module.exports = router;
