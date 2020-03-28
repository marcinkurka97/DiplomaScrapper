"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Offer.find().sort({ date: -1 }).exec();

            case 3:
              result = _context.sent;

              res.send(result);
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);

              res.status(500).send(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 7]]);
    }));

    function getOffers(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return getOffers;
  }()
};

module.exports = offer;
//# sourceMappingURL=OffersController.js.map