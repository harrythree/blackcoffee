const jwt = require('jsonwebtoken');

module.exports = async ctx => {
  try {
    const {jwt: jwtToVerify} = ctx.request.body;
    const decoded = jwt.verify(jwtToVerify, process.env.JWT_SECRET);
    ctx.body = decoded;
  } catch (e) {
    ctx.throw(401);
  }
};
