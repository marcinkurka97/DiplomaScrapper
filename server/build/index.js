"use strict";

var express = require("express");
var path = require("path");
var cluster = require("cluster");
var numCPUs = require("os").cpus().length;
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var morgan = require("morgan");
var LocalStrategy = require("passport-local").Strategy;
var routes = require("./routes");
var User = require("./models/User");
require("./lib/scrapper");
require("babel-core/register");
require("babel-polyfill");

var isDev = process.env.NODE_ENV !== "production";
var PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error("Node cluster master " + process.pid + " is running");

  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", function (worker, code, signal) {
    console.error("Node cluster worker " + worker.process.pid + " exited: code " + code + ", signal " + signal);
  });
} else {
  var app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../../react-ui/build")));

  app.use(bodyParser.json());
  app.use(morgan("combined"));
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, OPTIONS");
    next();
  });

  mongoose.connect("mongodb+srv://admin:admin@homepin-mscnm.gcp.mongodb.net/HomePin?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

  var conn = mongoose.connection;
  conn.on("error", console.error.bind(console, "connection error:"));
  conn.once("open", function () {
    console.log("Connected to mlab database!");
    app.listen(PORT, function () {
      return console.log("App is listening on port " + PORT + "!");
    });
    app.use("/api", routes);
  });
}
//# sourceMappingURL=index.js.map