const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.USERS_BASE_URL;
  }

  login(body) {
    return this.post('/login', body);
  }

  register(body) {
    return this.post('/register', body);
  }
}

module.exports = UsersAPI;