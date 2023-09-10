const endpoints = {
  login: '/users/login',
  currentUser: '/users/me',
  createProject: '/project',
  projects: '/projects',
  projectCount: '/project/count',
  setup: '/setup',
  install: '/install',
  getProjectById: '/project/',
  getCollections: '/collections/',
  getDocuments: '/document/:projectId/:collection',
};

export default endpoints;
