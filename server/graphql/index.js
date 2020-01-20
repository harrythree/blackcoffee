require('dotenv').config();

const { ApolloServer } = require('apollo-server');

const schema = require('./schema');
const dataSources = require('./data-sources');

const server = new ApolloServer({
  schema,
  dataSources,
  context: ({ req }) => ({ user: req.body.user })
});
  
server.listen().then(({url}) => console.log(`GraphQL server started: ${url}`));
