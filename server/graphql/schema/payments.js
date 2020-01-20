const { gql } = require('apollo-server');
const { charges } = require('stripe')(process.env.STRIPE_SECRET_KEY);

const typeDef = gql`
  type Payment {
    id: String
  }

  extend type Query {
    payments: [Payment]
  }

  extend type Mutation {
    createPayment(token: String!, amount: Int!): Payment!
  }
`;

const resolvers = {
  Query: {
    payments: () => [],
  },
  Mutation: {
    createPayment: async (parent, { token, amount, customerId }) => {
      const charge = await charges.create({
        amount: amount,
        customer: customerId,
        currency: 'usd',
        source: token,
      });

      console.log(charge);

      return { id: charge.id };
    },
  },
};

module.exports = { typeDef, resolvers };
