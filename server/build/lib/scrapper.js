"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runCron = exports.getOffersObj = exports.getOlxScrape = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// Scraping function
var getOlxScrape = exports.getOlxScrape = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url) {
    var _ref2, html, $, offers, pageLimiter, pageLimit, dt, offersFromMongoDB, lastScrapedOfferLink, arrayFromScrapes, offersObj, i, currentLink, nextPageNumber, nextUrl;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios.get(url);

          case 2:
            _ref2 = _context.sent;
            html = _ref2.data;
            $ = cheerio.load(html);
            offers = $("#offers_table .offer-wrapper");

            // Get last page value

            pageLimiter = $("[data-cy='page-link-last']");
            pageLimit = parseInt(pageLimiter.text().replace(/\s\s+/g, ""));
            dt = new Date();
            offersFromMongoDB = void 0;
            _context.prev = 10;
            _context.next = 13;
            return Offer.find().sort({ scrapeDate: -1 }).exec();

          case 13:
            offersFromMongoDB = _context.sent;
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](10);

            console.log(_context.t0);

          case 19:
            lastScrapedOfferLink = offersFromMongoDB.length !== 0 ? offersFromMongoDB[offersFromMongoDB.length - 1].link : "";

            // Add only new offers to offersObj Array

            arrayFromScrapes = (0, _from2.default)(offers);
            offersObj = [];
            i = 0;

          case 23:
            if (!(i < arrayFromScrapes.length)) {
              _context.next = 33;
              break;
            }

            currentLink = $(arrayFromScrapes[i]).find('[data-cy="listing-ad-title"]').attr("href");

            if (!(currentLink !== lastScrapedOfferLink)) {
              _context.next = 29;
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
            _context.next = 30;
            break;

          case 29:
            return _context.abrupt("break", 33);

          case 30:
            i++;
            _context.next = 23;
            break;

          case 33:
            if (!(offersObj.length < 1)) {
              _context.next = 37;
              break;
            }

            return _context.abrupt("return", offersObj);

          case 37:
            // Regex which creates next page number from current url
            nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
            // If we didnt reach last page

            if (!(nextPageNumber <= 10)) {
              _context.next = 47;
              break;
            }

            nextUrl = "https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=" + nextPageNumber;
            // Concat new values to offersObj array

            _context.t1 = offersObj;
            _context.next = 43;
            return getOlxScrape(nextUrl);

          case 43:
            _context.t2 = _context.sent;
            return _context.abrupt("return", _context.t1.concat.call(_context.t1, _context.t2));

          case 47:
            return _context.abrupt("return", offersObj);

          case 48:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[10, 16]]);
  }));

  return function getOlxScrape(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Forcing loop pause for x time (Google Geocoding API can handle only 50 request/sec)


var giveGeocodingSomeTime = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return timer(250);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function giveGeocodingSomeTime() {
    return _ref3.apply(this, arguments);
  };
}();

// Starting point to scraping function
var getOffersObj = exports.getOffersObj = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var firstUrl, offersObj;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            firstUrl = "https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=1";
            _context3.next = 3;
            return getOlxScrape(firstUrl);

          case 3:
            offersObj = _context3.sent;
            return _context3.abrupt("return", offersObj);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getOffersObj() {
    return _ref4.apply(this, arguments);
  };
}();

// CRON calls this function every x time (adding new values to database)


var runCron = exports.runCron = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res, next) {
    var offersPromise, dt, monthNames, geocoder, counter, offersToAddToMongoDB, i;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("Scraping!");
            _context4.next = 3;
            return getOffersObj();

          case 3:
            offersPromise = _context4.sent;
            dt = new Date();
            monthNames = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];
            _context4.next = 8;
            return NodeGeocoder(options);

          case 8:
            geocoder = _context4.sent;
            counter = 0;
            offersToAddToMongoDB = [];

            // Iterate though all the scraped data array

            i = 0;

          case 12:
            if (!(i < offersPromise.length)) {
              _context4.next = 36;
              break;
            }

            if (!(counter >= 48)) {
              _context4.next = 17;
              break;
            }

            counter = 0;
            _context4.next = 17;
            return giveGeocodingSomeTime();

          case 17:
            _context4.t0 = offersToAddToMongoDB;
            _context4.t1 = shortid.generate();
            _context4.t2 = offersPromise[i].title;
            _context4.t3 = offersPromise[i].link;
            _context4.t4 = offersPromise[i].img;
            _context4.t5 = offersPromise[i].price;
            _context4.t6 = offersPromise[i].type;
            _context4.t7 = offersPromise[i].localization;
            _context4.t8 = new Date();
            _context4.t9 = offersPromise[i].date.includes("dzisiaj") ? dt.getDate() + "-" + monthNames[dt.getMonth()] + "-" + dt.getFullYear() : offersPromise[i].date.includes("wczoraj") ? dt.getDate() - 1 + "-" + monthNames[dt.getMonth()] + "-" + dt.getFullYear() : offersPromise[i].date;
            _context4.next = 29;
            return geocoder.geocode(offersPromise[i].localization === "Katowice, Śródmieście" ? "Katowice, Dworzec" : offersPromise[i].localization).then(function (res) {
              var lat = res[0].latitude.toString();
              var lng = res[0].longitude.toString();

              var latToSwap = lat.substr(5);
              var lngToSwap = lng.substr(5);

              var randLat = Math.floor(Math.random(parseInt(latToSwap)) * 10000);
              var randLng = Math.floor(Math.random(parseInt(lngToSwap)) * 10000);

              lat = lat.substr(0, 5) + randLat;
              lng = lng.substr(0, 5) + randLng;

              return { lat: parseFloat(lat), lng: parseFloat(lng) };
            }).catch(function (err) {
              console.log(err);
            });

          case 29:
            _context4.t10 = _context4.sent;
            _context4.t11 = {
              id: _context4.t1,
              title: _context4.t2,
              link: _context4.t3,
              img: _context4.t4,
              price: _context4.t5,
              type: _context4.t6,
              localization: _context4.t7,
              scrapeDate: _context4.t8,
              date: _context4.t9,
              position: _context4.t10
            };

            _context4.t0.push.call(_context4.t0, _context4.t11);

            counter++;

          case 33:
            i++;
            _context4.next = 12;
            break;

          case 36:

            if (offersToAddToMongoDB.length !== 0) {
              Offer.collection.insertMany(offersToAddToMongoDB, function (err, docs) {
                if (err) {
                  return console.error(err);
                } else {
                  console.log("Multiple documents inserted to Collection");
                }
              });
            }

            console.log("DONE!");

          case 38:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function runCron(_x2, _x3, _x4) {
    return _ref5.apply(this, arguments);
  };
}();

// runCron();


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require("axios");
var cheerio = require("cheerio");
var shortid = require("shortid");
var NodeGeocoder = require("node-geocoder");
var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
require("../models/Offer");

var Offer = mongoose.model("Offers");

// Options for Google Geocoding
var options = {
  provider: "google",
  httpAdapter: "https",
  apiKey: "AIzaSyAF-_e-JJwREzFyL4GsSBDxoqCxMPptirg",
  formatter: null
};

function timer(ms) {
  return new _promise2.default(function (res) {
    return setTimeout(res, ms);
  });
}
//# sourceMappingURL=scrapper.js.map