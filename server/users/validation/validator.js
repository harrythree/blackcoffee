module.exports = schema => async (ctx, next) => {
  const {error} = schema.validate(ctx.request.body);

  if (error) {
    ctx.throw(400);
  } else {
    await next();
  }
};
