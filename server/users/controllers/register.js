const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knex = require('../knex');

module.exports = async ctx => {
  try {
    const {email, firstName, lastName, password} = ctx.request.body;

    const hash = await bcrypt.hash(password, 10);
    const userInsertData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password: hash
    };
    
    const [id] = await knex.insert(userInsertData).table('users').returning('id');

    const body = {
      jwt: jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION}),
      user: {
        id,
        email,
        firstName,
        lastName
      }
    };

    ctx.body = body;
  } catch (err) {
    ctx.throw(400);
  }
};
