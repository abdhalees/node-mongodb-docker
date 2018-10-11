var Joi = require('joi-browser');
var constants = require('../../../config/constants');

module.exports = {
  params: {
    company: Joi.string()
      .trim()
      .required(),
    workspace: Joi.string()
      .trim()
      .required()
  },
  body: {
    email: Joi.string()
      .email()
      .required(),
    role: Joi.string()
      .valid([constants.BASIC, constants.ADMIN])
      .required()
  }
};
