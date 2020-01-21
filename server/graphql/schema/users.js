const { gql } = require('apollo-server');

const typeDef = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
  }

  type AuthenticatedUser {
    jwt: String!
    user: User!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthenticatedUser!
    login(input: LoginInput!): AuthenticatedUser!
  }
`;

const resolvers = {
  Mutation: {
    register: (parent, { input }, { dataSources }) => dataSources.usersApi.register(input),
    login: (parent, { input }, { dataSources }) => dataSources.usersApi.login(input)
  }
};

module.exports = { typeDef, resolvers };
