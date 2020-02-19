const Joi = require('@hapi/joi');

const validator = require('./validator');

const joiStringMax100Required = Joi.string().max(100).required();

const registerSchema = Joi.object({
  email: joiStringMax100Required,
  firstName: joiStringMax100Required,
  lastName: joiStringMax100Required,
  password: joiStringMax100Required
});

const loginSchema = Joi.object({
  email: joiStringMax100Required,
  password: joiStringMax100Required
});

const infoSchema = Joi.object({
  jwt: Joi.string().required()
});

module.exports = {
  validateRegister: validator(registerSchema),
  validateLogin: validator(loginSchema),
  validateInfo: validator(infoSchema)
};
