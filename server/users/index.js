require('dotenv').config();

const Koa = require('koa');
const jwt = require('jsonwebtoken');
const router = require('koa-joi-router');
const bcrypt = require('bcryptjs');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
});

const app = new Koa();
const userRouter = router();
const { Joi } = router;
const joiStringMax100Required = Joi.string().max(100).required();
const expiresIn = { expiresIn: '1h' };

userRouter.route({
  method: 'post',
  path: '/register',
  validate: {
    body: {
      email: joiStringMax100Required,
      firstName: joiStringMax100Required,
      lastName: joiStringMax100Required,
      password: joiStringMax100Required
    },
    type: 'json'
  },
  handler: async (ctx) => {
    const { email, firstName, lastName, password } = ctx.request.body;
    
    const hash = await bcrypt.hash(password, 10);
    const userInsertData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password: hash
    };
    
    const [ id ] = await knex.insert(userInsertData).table('users').returning('id')
      .catch((err) => {
        if (err.constraint === 'users_email_unique') {
          return ctx.throw(400);
        }
        throw err;
      });

    const body = {
      jwt: jwt.sign({ id }, process.env.JWT_SECRET, expiresIn),
      user: {
        id,
        email,
        firstName,
        lastName
      }
    };

    ctx.body = body;
  }
});

userRouter.route({
  method: 'post',
  path: '/login',
  validate: {
    body: {
      email: joiStringMax100Required,
      password: joiStringMax100Required
    },
    type: 'json'
  },
  handler: async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await knex('users').where({ email }).first();
    
    if (user) {
      const { id, password: userPassword, first_name: firstName, last_name: lastName } = user;
      const valid = await bcrypt.compare(password, userPassword);

      if (valid) {
        const body = {
          jwt: jwt.sign({ id: user.id }, process.env.JWT_SECRET, expiresIn),
          user: {
            id,
            email,
            firstName,
            lastName
          }
        }
        return ctx.body = body;
      }
    }

    ctx.throw(401);
  }
});

userRouter.route({
  method: 'post',
  path: '/info',
  validate: {
    body: {
      jwt: Joi.string().required()
    },
    type: 'json'
  },
  handler: async (ctx) => {
    const { jwt: jwtToVerify } = ctx.request.body;

    try {
      const decoded = jwt.verify(jwtToVerify, process.env.JWT_SECRET);
      return ctx.body = decoded;
    } catch (e) {
      ctx.throw(401);
    }
  }
});

app.use(userRouter.middleware());

knex.migrate.latest()
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`user-service started on ${process.env.PORT}`));
  });