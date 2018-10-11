var Joi = require('joi-browser');

module.exports = {
  params: {
    company: Joi.string()
      .trim()
      .required()
  },
  body: {
    _id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    displayName: Joi.string()
      .trim()
      .empty()
  }
};
