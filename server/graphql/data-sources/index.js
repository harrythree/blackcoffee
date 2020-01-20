const CmsAPI = require('./cms-api');

module.exports = () => {
  return {
    cmsAPI: new CmsAPI(),
  };
};
