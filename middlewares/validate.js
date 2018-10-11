var Joi = require('joi-browser');

module.exports = function(schema) {
  return function(req, res, next) {
    var expectedKeys = Object.keys(schema);
    var objectToValidate = expectedKeys.reduce(function(accum, curr) {
      accum[curr] = req[curr];

      return accum;
    }, {});
    var validateStatus = Joi.validate(objectToValidate, schema);
    if (validateStatus.error) {
      res.status(400).json({ err: validateStatus.error.details[0].message });
    } else next();
  };
};
