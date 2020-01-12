"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Users", UserSchema);
//# sourceMappingURL=User.js.map