"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runCron = undefined;

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// Forcing loop pause for x time (Google Geocoding API can handle only 50 request/sec)
var giveGeocodingSomeTime = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return timer(250);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function giveGeocodingSomeTime() {
    return _ref.apply(this, arguments);
  };
}();

// CRON calls this function every x time (adding new values to database)
var runCron = exports.runCron = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res, next) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("Scraping!");
            // const offersPromise = [
            //   ...(await getOlxOffersObj()),
            //   ...(await getOtoDomOffersObj()),
            // ];

            _context2.t0 = console;
            _context2.next = 4;
            return (0, _GratkaScrapper.getGratkaOffersObj)();

          case 4:
            _context2.t1 = _context2.sent;

            _context2.t0.log.call(_context2.t0, _context2.t1);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function runCron(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _OLXScrapper = require("./OLXScrapper");

var _OtoDomScrapper = require("./OtoDomScrapper");

var _GratkaScrapper = require("./GratkaScrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

runCron();
//# sourceMappingURL=scrapper.js.map