const UsersApi = require('./users-api');
const CmsAPI = require('./cms-api');

module.exports = () => {
  return {
    usersApi: new UsersApi(),
    cmsAPI: new CmsAPI(),
  };
};
