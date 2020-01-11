import db from "../lib/db";
const mongoose = require("mongoose");
require("../models/Offer");

const Offer = mongoose.model("Offers");

const offer = {
  addOffer: (req, res) => {
    const singleOffer = new Offer({
      id: req.body.id,
      title: req.body.title,
      link: req.body.link,
      img: req.body.img,
      price: req.body.price,
      type: req.body.type,
      localization: req.body.localization,
      date: req.body.date,
      position: {
        lat: req.body.position.lat,
        lng: req.body.position.lng
      }
    });

    singleOffer.save(function(err, offer) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      return res.sendStatus(201);
    });
  },
  getOffers: async (req, res, next) => {
    // Get the scrape data
    const olxScrapes = db.get("olxScrape").value();

    // Respond with JSON
    res.json(olxScrapes);
  }
};

module.exports = offer;
