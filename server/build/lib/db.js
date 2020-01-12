"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lowdb = require("lowdb");

var _lowdb2 = _interopRequireDefault(_lowdb);

var _FileSync = require("lowdb/adapters/FileSync");

var _FileSync2 = _interopRequireDefault(_FileSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Setup local json DataBase
var adapter = new _FileSync2.default("../db.json");
var db = (0, _lowdb2.default)(adapter);
db.defaults({ olxScrape: [] }).write();

exports.default = db;
//# sourceMappingURL=db.js.map