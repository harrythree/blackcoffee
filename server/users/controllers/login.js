const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knex = require('../knex');

module.exports = async ctx => {
  const {email, password} = ctx.request.body;
  const user = await knex('users').where({email}).first();

  if (user) {
    const {id, password: userPassword, first_name: firstName, last_name: lastName} = user;
    const valid = await bcrypt.compare(password, userPassword);

    if (valid) {
      const body = {
        jwt: jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION}),
        user: {
          id,
          email,
          firstName,
          lastName
        }
      }
      ctx.body = body;
    } else {
      ctx.throw(401);
    }
  } else {
    ctx.throw(404);
  }
};
