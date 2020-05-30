"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OfferSchema = new Schema({
  id: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  link: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    sparse: true
  },
  img: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    sparse: true
  },
  price: {
    type: String,
    minlength: 5,
    maxlength: 25
  },
  type: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  localization: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  date: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15
  },
  position: {
    lat: { type: Number, required: true, minlength: 5, maxlength: 10 },
    lng: { type: Number, required: true, minlength: 5, maxlength: 10 }
  }
});

module.exports = mongoose.model("Offers", OfferSchema);
//# sourceMappingURL=Offer.js.map