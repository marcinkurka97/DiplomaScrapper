const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const LocalStrategy = require("passport-local").Strategy;
const routes = require("./routes");
const User = require("./models/User");
require("./lib/scrapper");
import db from "./lib/db";

const PORT = process.env.PORT || 9000;

const app = express();
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
  session({
    secret: "marcin",
    resave: false,
    saveUninitialized: true
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://admin:admin@homepin-mscnm.gcp.mongodb.net/HomePin?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error:"));
conn.once("open", () => {
  console.log("Connected to mlab database!");
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}!`));
  app.use("/api", routes);
});
