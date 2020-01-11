const express = require("express");
const { user, offers } = require("../controllers");

const router = express.Router();

router.post("/user/login", user.userLogin);
router.post("/user/logout", user.userLogout);
router.post("/user/register", user.userRegister);

router.post("/offers/addOffer", offers.addOffer);
router.get("/offers/getOffers", offers.getOffers);

module.exports = router;
