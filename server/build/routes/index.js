"use strict";

var express = require("express");

var _require = require("../controllers"),
    user = _require.user,
    offers = _require.offers;

var router = express.Router();

router.post("/user/login", user.userLogin);
router.post("/user/logout", user.userLogout);
router.post("/user/register", user.userRegister);

router.post("/offers/addOffer", offers.addOffer);
router.get("/offers/getOffers", offers.getOffers);

module.exports = router;
//# sourceMappingURL=index.js.map