require('dotenv').config();

const { ApolloServer, AuthenticationError } = require('apollo-server');
const fetch = require('node-fetch');

const schema = require('./schema');
const dataSources = require('./data-sources');

const server = new ApolloServer({
  schema,
  dataSources,
  context: async ({ req }) => {
    const { authorization } = req.headers;
    const userContext = { user: null };

    if (authorization && authorization.startsWith('Bearer ')) {
      const jwt = authorization.substring(7, authorization.length);
      const fetchOptions = {
        method: 'POST',
        body: JSON.stringify({ jwt }),
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch(`${process.env.USERS_BASE_URL}/info`, fetchOptions);

      if (response.ok) {
        const { id } = await response.json();
        userContext.user = id;
      }
    }

    return userContext;
  },
});
  
server.listen().then(({url}) => console.log(`GraphQL server started: ${url}`));
