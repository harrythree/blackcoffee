const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash.merge');

const { typeDef: Users, resolvers: usersResolvers } = require('./users');
const { typeDef: Payments, resolvers: paymentsResolvers } = require('./payments');
const { typeDef: Orders, resolvers: ordersResolvers } = require('./orders');
const { typeDef: MenuItems, resolvers: menuItemsResolvers } = require('./menu-items');

const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [Query, Users, Payments, Orders, MenuItems],
  resolvers: merge(usersResolvers, paymentsResolvers, ordersResolvers, menuItemsResolvers),
});

module.exports = schema;
