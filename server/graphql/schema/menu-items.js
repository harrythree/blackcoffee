const { gql } = require('apollo-server');

const typeDef = gql`
  type MenuItem {
    name: String!
    description: String!
    price: Float!
    rewards: Int!
    image: String!
  }

  extend type Query {
    menuItems: [MenuItem!]!
  }
`;

const resolvers = {
  Query: {
    menuItems: async (parent, args, { dataSources, user }) => {
      console.log(user);
      const results = await dataSources.cmsAPI.getMenuItems();
      return results.map(({
        name,
        description,
        price,
        rewards,
        image
      }) => ({
        name,
        description,
        price,
        rewards,
        image
      }));
    },
  },
};

module.exports = { typeDef, resolvers };
