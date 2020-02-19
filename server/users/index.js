require('dotenv').config();

const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const knex = require('./knex');
const errorHandler = require('./error-handler');
const register = require('./controllers/register');
const login = require('./controllers/login');
const info = require('./controllers/info');
const {validateRegister, validateLogin, validateInfo} = require('./validation');

const app = new Koa();
const router = new Router();

const port = process.env.PORT;

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/info', validateInfo, info);

app.use(errorHandler);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

knex.migrate.latest()
  .then(() => {
    app.listen(port, () => console.log(`user-service started on ${port}`));
  });