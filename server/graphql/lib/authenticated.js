const { AuthenticationError } = require('apollo-server');

module.exports = next => (root, args, context, info) => {
  if (!context.user) {
      throw new AuthenticationError('Unauthorized');
  }

  return next(root, args, context, info);
};
