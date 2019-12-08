const mongoose = require("mongoose");
const passport = require("passport");
require("../models/User");

const User = mongoose.model("Users");

const user = {
  userLogin: (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.sendStatus(403);
      }

      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.send(user);
      });
    })(req, res, next);
  },
  userLogout: (req, res) => {
    req.logout();
    res.sendStatus(200);
  },
  userRegister: (req, res) => {
    User.register(
      new User({
        username: req.body.username,
        email: req.body.email
      }),
      req.body.password,
      function(err, user) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        } else {
          passport.authenticate("local")(req, res, function() {
            res.sendStatus(201);
          });
        }
      }
    );
  }
};

module.exports = user;
