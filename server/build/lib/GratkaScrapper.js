"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGratkaScrape = exports.getGratkaOffersObj = undefined;

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// Starting point to scraping function
var getGratkaOffersObj = exports.getGratkaOffersObj = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var offersObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getGratkaScrape("https://gratka.pl/nieruchomosci/mieszkania/katowice/?page=1");

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

  return function getGratkaOffersObj() {
    return _ref.apply(this, arguments);
  };
}();

// Scraping function


var getGratkaScrape = exports.getGratkaScrape = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url) {
    var _ref3, html, $, offers, pageLimiter, pageLimit, dt, offersFromMongoDB, lastScrapedOfferLink, arrayFromScrapes, offersObj, i, currentLink, price;

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
            offers = $(".content__listingContainer .content__listing .teaserEstate");

            // Get last page value

            pageLimiter = $(".pagination").children(".pagination__nextPage").prev().text();
            pageLimit = parseInt(pageLimiter);
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

            // for (let i = 0; i < arrayFromScrapes.length; i++) {

            for (i = 0; i < 1; i++) {
              currentLink = $(arrayFromScrapes[i]).find(".teaserEstate__photo a").attr("href");
              price = $(arrayFromScrapes[i]).find(".teaserEstate__priceBox .teaserEstate__price").text().replace(/\s\s+/g, "").replace($(arrayFromScrapes[i]).find(".teaserEstate__priceBox .teaserEstate__price .teaserEstate__additionalPrice").text().replace(/\s\s+/g, ""), "");


              console.log({
                title: $(arrayFromScrapes[i]).find(".teaserEstate__title .teaserEstate__anchor").text().replace(/\s\s+/g, ""),
                link: $(arrayFromScrapes[i]).find(".teaserEstate__photo a").attr("href"),
                img: $(arrayFromScrapes[i]).find(".teaserEstate__photo a img").attr("data-src"),
                price: price.replace("/mc", ""),
                type: price.includes("/mc") ? "Mieszkania » Wynajem" : price.includes("Zapytaj o cenę") ? "Mieszkania » Zamiana" : "Mieszkania » Sprzedaż",
                localization: $(arrayFromScrapes[i]).find(".teaserEstate__mainInfo .teaserEstate__localization").text().replace(/\s\s+/g, ""),
                date: $(arrayFromScrapes[i]).find(".teaserEstate__details .teaserEstate__info").text().replace(/^\s+|\s+$/g, "").replace("Aktualizacja: ", "").substr(0, 10).replace(/\./g, "-")
              });

              // if (currentLink !== lastScrapedOfferLink) {
              //   offersObj.push({
              //     title: $(arrayFromScrapes[i])
              //       .find('[data-cy="listing-ad-title"]')
              //       .text()
              //       .replace(/\s\s+/g, ""),
              //     link: $(arrayFromScrapes[i])
              //       .find('[data-cy="listing-ad-title"]')
              //       .attr("href"),
              //     img: $(arrayFromScrapes[i]).find("img").attr("src"),
              //     price: $(arrayFromScrapes[i]).find(".td-price strong").text(),
              //     type: $(arrayFromScrapes[i])
              //       .find(".title-cell p small")
              //       .text()
              //       .replace(/\s\s+/g, ""),
              //     localization: $(arrayFromScrapes[i])
              //       .find("[data-icon='location-filled']")
              //       .parent()
              //       .text()
              //       .replace(/\s\s+/g, ""),
              //     date: `${$(arrayFromScrapes[i])
              //       .find("[data-icon='clock']")
              //       .parent()
              //       .text()
              //       .replace(/^\s+|\s+$/g, "")
              //       .replace("  ", "-")}-${dt.getFullYear()}`,
              //   });
              // } else {
              //   break;
              // }
            }

            // // Recursive iteration through all pages the get all the data
            // if (offersObj.length < 1) {
            //   return offersObj;
            // } else {
            //   // Regex which creates next page number from current url
            //   const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;
            //   // If we didnt reach last page
            //   if (nextPageNumber <= 10) {
            //     const nextUrl = `https://www.olx.pl/nieruchomosci/mieszkania/katowice/?page=${nextPageNumber}`;
            //     // Concat new values to offersObj array
            //     return [...offersObj, ...(await getOlxScrape(nextUrl))];
            //   } else {
            //     return offersObj;
            //   }
            // }

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[10, 16]]);
  }));

  return function getGratkaScrape(_x) {
    return _ref2.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
require("../models/Offer");
var Offer = mongoose.model("Offers");
//# sourceMappingURL=GratkaScrapper.js.map