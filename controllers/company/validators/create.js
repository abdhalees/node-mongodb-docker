var Joi = require('joi-browser');

module.exports = {
  body: {
    displayName: Joi.string()
      .trim()
      .required()
  }
};
