var Joi = require('joi-browser');

module.exports = {
  params: {
    _id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
  }
};
