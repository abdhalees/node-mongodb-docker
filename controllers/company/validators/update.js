var Joi = require('joi-browser');

module.exports = {
  body: {
    _id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    displayName: Joi.string()
      .trim()
      .empty()
  }
};
