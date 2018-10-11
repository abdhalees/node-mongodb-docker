var Joi = require('joi-browser');

module.exports = {
  params: {
    company: Joi.string()
      .trim()
      .required()
  }
};
