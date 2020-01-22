const { RESTDataSource } = require('apollo-datasource-rest');

class CmsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.CMS_BASE_URL;
  }

  getMenuItems() {
    return this.get('/menu-items');
  }

  getNewsItems() {
    return this.get('/news-items');
  }
}

module.exports = CmsAPI;
