"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOtoDomScrape = exports.getOtoDomOffersObj = undefined;

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// Starting point to scraping function
var getOtoDomOffersObj = exports.getOtoDomOffersObj = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var rentOffersObj, buyOffersObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getOtoDomScrape("https://www.otodom.pl/wynajem/mieszkanie/katowice/?page=1");

          case 2:
            rentOffersObj = _context.sent;
            _context.next = 5;
            return getOtoDomScrape("https://www.otodom.pl/sprzedaz/mieszkanie/katowice/?page=1");

          case 5:
            buyOffersObj = _context.sent;
            return _context.abrupt("return", [].concat((0, _toConsumableArray3.default)(rentOffersObj), (0, _toConsumableArray3.default)(buyOffersObj)));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getOtoDomOffersObj() {
    return _ref.apply(this, arguments);
  };
}();

// Scraping function


var getOtoDomScrape = exports.getOtoDomScrape = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url) {
    var _ref3, html, $, offers, pageLimiter, pageLimit, offerType, dt, offersFromMongoDB, lastScrapedOfferLink, arrayFromScrapes, offersObj, i, currentLink, nextPageNumber, nextUrl;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return axios.get(url);

          case 2:
            _ref3 = _context2.sent;
            html = _ref3.data;
            $ = cheerio.load(html);
            offers = $(".section-listing__row-content .offer-item");

            // Get last page value

            pageLimiter = $(".pager").children(".pager-next").prev().text();
            pageLimit = parseInt(pageLimiter);

            // Get offer type

            offerType = $(".query-text .query-text-h1").text().includes("sprzedaż") ? "sprzedaz" : "wynajem";
            dt = new Date();
            offersFromMongoDB = void 0;
            _context2.prev = 11;
            _context2.next = 14;
            return Offer.find().sort({ scrapeDate: -1 }).exec();

          case 14:
            offersFromMongoDB = _context2.sent;
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](11);

            console.log(_context2.t0);

          case 20:
            lastScrapedOfferLink = offersFromMongoDB.length !== 0 ? offersFromMongoDB[offersFromMongoDB.length - 1].link : "";

            // Add only new offers to offersObj Array

            arrayFromScrapes = (0, _from2.default)(offers);
            offersObj = [];
            i = 0;

          case 24:
            if (!(i < arrayFromScrapes.length)) {
              _context2.next = 34;
              break;
            }

            currentLink = $(arrayFromScrapes[i]).attr("data-url");

            if (!(currentLink !== lastScrapedOfferLink)) {
              _context2.next = 30;
              break;
            }

            offersObj.push({
              title: $(arrayFromScrapes[i]).find(".offer-item-title").text().replace(/\s\s+/g, ""),
              link: $(arrayFromScrapes[i]).attr("data-url"),
              img: $(arrayFromScrapes[i]).find(".img-cover").img,
              price: $(arrayFromScrapes[i]).find(".offer-item-price").text().replace(/\s\s+/g, "").replace("/mc", ""),
              type: $(arrayFromScrapes[i]).find(".text-nowrap .hidden-xs").text() === "Mieszkanie na wynajem: " ? "Mieszkania » Wynajem" : "Mieszkania » Sprzedaż",
              localization: $(arrayFromScrapes[i]).find(".offer-item-header p.text-nowrap").text().replace(/\s\s+/g, "").replace($(arrayFromScrapes[i]).find(".text-nowrap .hidden-xs").text(), ""),
              date: null
            });
            _context2.next = 31;
            break;

          case 30:
            return _context2.abrupt("break", 34);

          case 31:
            i++;
            _context2.next = 24;
            break;

          case 34:
            if (!(offersObj.length < 1)) {
              _context2.next = 38;
              break;
            }

            return _context2.abrupt("return", offersObj);

          case 38:
            // Regex which creates next page number from current url
            nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
            // If we didnt reach last page

            if (!(nextPageNumber <= 10)) {
              _context2.next = 51;
              break;
            }

            nextUrl = "https://www.otodom.pl/" + offerType + "/mieszkanie/katowice/?page=" + nextPageNumber;
            // Concat new values to offersObj array

            _context2.t1 = [];
            _context2.t2 = offersObj;
            _context2.t3 = _toConsumableArray3.default;
            _context2.next = 46;
            return getOtoDomScrape(nextUrl);

          case 46:
            _context2.t4 = _context2.sent;
            _context2.t5 = (0, _context2.t3)(_context2.t4);
            return _context2.abrupt("return", _context2.t1.concat.call(_context2.t1, _context2.t2, _context2.t5));

          case 51:
            return _context2.abrupt("return", offersObj);

          case 52:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[11, 17]]);
  }));

  return function getOtoDomScrape(_x) {
    return _ref2.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
require("../models/Offer");
var Offer = mongoose.model("Offers");
//# sourceMappingURL=OtoDomScrapper.js.map