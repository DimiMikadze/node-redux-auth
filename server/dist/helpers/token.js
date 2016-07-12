'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenForUser = tokenForUser;

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenForUser(user) {
  var timestamp = new Date().getTime();

  return _jwtSimple2.default.encode({ sub: user.id, iat: timestamp }, _config.dbConfig.secret);
}