"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = require("../lib/db");
var mongoose = require("mongoose");
require("../models/Offer");

var Offer = mongoose.model("Offers");

var offer = {
  addOffer: function addOffer(req, res) {
    var singleOffer = new Offer({
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

    singleOffer.save(function (err, offer) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      return res.sendStatus(201);
    });
  },
  getOffers: function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      var olxScrapes;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Get the scrape data
              olxScrapes = db.get("olxScrape").value();

              // Respond with JSON

              res.json(olxScrapes);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    function getOffers(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return getOffers;
  }()
};

module.exports = offer;
//# sourceMappingURL=OffersController.js.map