var mongoose = require('mongoose');
var constants = require('../config/constants');
var roles = [constants.BASIC, constants.ADMIN];

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validateEmail, 'Please fill a valid email address']
    },
    role: { type: String, enum: roles }
  },
  { _id: false }
);

var workspaceSchema = mongoose.Schema({
  displayName: { type: String, required: true, validate: /\S+/ },
  name: {
    type: String,
    index: { unique: true },
    validate: function() {
      this.displayName.toLowerCase() === this.name;
    }
  },
  users: [{ type: userSchema }]
});

var companySchema = mongoose.Schema({
  displayName: { type: String, required: true, validate: /\S+/ },
  name: {
    type: String,
    unique: true,
    validate: function() {
      this.displayName.toLowerCase() === this.name;
    }
  },
  workspaces: [{ type: workspaceSchema }]
});

module.exports = mongoose.model('Company', companySchema, 'companies');
