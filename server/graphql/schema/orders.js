const { gql } = require('apollo-server');

const typeDef = gql`
  type Order {
    storeId: String
    menuId: String
    userId: String
    dateTime: String
  }

  extend type Query {
    orders: [Order]
  }
`;

const resolvers = {
  Query: {
    orders: () => [],
  },
};

module.exports = { typeDef, resolvers };
