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

userRouter.route({
  method: 'post',
  path: '/register',
  validate: {
    body: {
      email: Joi.string().max(100).required(),
      password: Joi.string().max(100).required()
    },
    type: 'json'
  },
  handler: async (ctx) => {
    const { email, password } = ctx.request.body;
    const hash = await bcrypt.hash(password, 10);
    const [ id ] = await knex.insert({ email, password: hash }).table('users').returning('id')
      .catch((err) => {
        if (err.constraint === 'users_email_unique') {
          return ctx.throw(400);
        }
        throw err;
      });

    ctx.body = jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
});

userRouter.route({
  method: 'post',
  path: '/login',
  validate: {
    body: {
      email: Joi.string().max(100).required(),
      password: Joi.string().max(100).required()
    },
    type: 'json'
  },
  handler: async (ctx) => {
    const { email, password } = ctx.request.body;
    const user = await knex('users').where({ email }).first();
    
    if (user) {
      const valid = await bcrypt.compare(password, user.password);

      if (valid) {
        return ctx.body = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      }
    }

    ctx.throw(401);
  }
});

app.use(userRouter.middleware());

knex.migrate.latest()
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`user-service started on ${process.env.PORT}`));
  });