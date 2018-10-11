module.exports = {
  createSchema: require('./create'),
  updateSchema: require('./update'),
  getByIdSchema: require('./getById'),
  createWorkspaceSchema: require('./createWorkspace'),
  updateWorkspaceSchema: require('./updateWorkspace'),
  getWorkspaceByNameSchema: require('./getWorkspaceByName'),
  getAllWorkspacesSchema: require('./getAllWorkspaces'),
  associateUserSchema: require('./associateUser')
};
