const { gql } = require('apollo-server');

const typeDef = gql`
  type NewsItem {
    title: String!
    body: String!
    image: String!
  }

  extend type Query {
    newsItems: [NewsItem!]!
  }
`;

const resolvers = {
  Query: {
    newsItems: async (parent, args, { dataSources }) => dataSources.cmsAPI.getNewsItems(),
  },
};

module.exports = { typeDef, resolvers };
