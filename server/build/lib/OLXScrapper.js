"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOlxScrape = exports.getOlxOffersObj = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// Starting point to scraping function
var getOlxOffersObj = exports.getOlxOffersObj = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var offersObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getOlxScrape("https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=1");

          case 2:
            offersObj = _context.sent;
            return _context.abrupt("return", offersObj);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getOlxOffersObj() {
    return _ref.apply(this, arguments);
  };
}();

// Scraping function


var getOlxScrape = exports.getOlxScrape = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url) {
    var _ref3, html, $, offers, pageLimiter, pageLimit, dt, offersFromMongoDB, lastScrapedOfferLink, arrayFromScrapes, offersObj, i, currentLink, nextPageNumber, nextUrl;

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
            offers = $("#offers_table .offer-wrapper");

            // Get last page value

            pageLimiter = $("[data-cy='page-link-last']");
            pageLimit = parseInt(pageLimiter.text().replace(/\s\s+/g, ""));
            dt = new Date();
            offersFromMongoDB = void 0;
            _context2.prev = 10;
            _context2.next = 13;
            return Offer.find().sort({ scrapeDate: -1 }).exec();

          case 13:
            offersFromMongoDB = _context2.sent;
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](10);

            console.log(_context2.t0);

          case 19:
            lastScrapedOfferLink = offersFromMongoDB.length !== 0 ? offersFromMongoDB[offersFromMongoDB.length - 1].link : "";

            // Add only new offers to offersObj Array

            arrayFromScrapes = (0, _from2.default)(offers);
            offersObj = [];
            i = 0;

          case 23:
            if (!(i < arrayFromScrapes.length)) {
              _context2.next = 33;
              break;
            }

            currentLink = $(arrayFromScrapes[i]).find('[data-cy="listing-ad-title"]').attr("href");

            if (!(currentLink !== lastScrapedOfferLink)) {
              _context2.next = 29;
              break;
            }

            offersObj.push({
              title: $(arrayFromScrapes[i]).find('[data-cy="listing-ad-title"]').text().replace(/\s\s+/g, ""),
              link: $(arrayFromScrapes[i]).find('[data-cy="listing-ad-title"]').attr("href"),
              img: $(arrayFromScrapes[i]).find("img").attr("src"),
              price: $(arrayFromScrapes[i]).find(".td-price strong").text(),
              type: $(arrayFromScrapes[i]).find(".title-cell p small").text().replace(/\s\s+/g, ""),
              localization: $(arrayFromScrapes[i]).find("[data-icon='location-filled']").parent().text().replace(/\s\s+/g, ""),
              date: $(arrayFromScrapes[i]).find("[data-icon='clock']").parent().text().replace(/^\s+|\s+$/g, "").replace("  ", "-") + "-" + dt.getFullYear()
            });
            _context2.next = 30;
            break;

          case 29:
            return _context2.abrupt("break", 33);

          case 30:
            i++;
            _context2.next = 23;
            break;

          case 33:
            if (!(offersObj.length < 1)) {
              _context2.next = 37;
              break;
            }

            return _context2.abrupt("return", offersObj);

          case 37:
            // Regex which creates next page number from current url
            nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
            // If we didnt reach last page

            if (!(nextPageNumber <= 10)) {
              _context2.next = 50;
              break;
            }

            nextUrl = "https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=" + nextPageNumber;
            // Concat new values to offersObj array

            _context2.t1 = [];
            _context2.t2 = offersObj;
            _context2.t3 = _toConsumableArray3.default;
            _context2.next = 45;
            return getOlxScrape(nextUrl);

          case 45:
            _context2.t4 = _context2.sent;
            _context2.t5 = (0, _context2.t3)(_context2.t4);
            return _context2.abrupt("return", _context2.t1.concat.call(_context2.t1, _context2.t2, _context2.t5));

          case 50:
            return _context2.abrupt("return", offersObj);

          case 51:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[10, 16]]);
  }));

  return function getOlxScrape(_x) {
    return _ref2.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
require("../models/Offer");
var Offer = mongoose.model("Offers");
//# sourceMappingURL=OLXScrapper.js.map