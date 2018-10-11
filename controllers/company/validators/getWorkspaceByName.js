var Joi = require('joi-browser');

module.exports = {
  params: {
    company: Joi.string()
      .trim()
      .required(),
    workspace: Joi.string()
      .trim()
      .required()
  }
};
