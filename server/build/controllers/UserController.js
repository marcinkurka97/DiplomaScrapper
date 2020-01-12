"use strict";

var mongoose = require("mongoose");
var passport = require("passport");
require("../models/User");

var User = mongoose.model("Users");

var user = {
  userLogin: function userLogin(req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.sendStatus(403);
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.send(user);
      });
    })(req, res, next);
  },
  userLogout: function userLogout(req, res) {
    req.logout();
    res.sendStatus(200);
  },
  userRegister: function userRegister(req, res) {
    User.register(new User({
      username: req.body.username,
      email: req.body.email
    }), req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      } else {
        passport.authenticate("local")(req, res, function () {
          res.sendStatus(201);
        });
      }
    });
  }
};

module.exports = user;
//# sourceMappingURL=UserController.js.map