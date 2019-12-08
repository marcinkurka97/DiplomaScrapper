const express = require("express");
const { user, scrapes } = require("../controllers");

const router = express.Router();

router.post("/user/login", user.userLogin);
router.post("/user/logout", user.userLogout);
router.post("/user/register", user.userRegister);

router.get("/scrapes/getData", scrapes.getData);

module.exports = router;
