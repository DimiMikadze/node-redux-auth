'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUsers = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * List all users
 */
var fetchUsers = exports.fetchUsers = function fetchUsers(req, res, next) {
  _user2.default.find({}, function (err, users) {
    if (err) {
      return next(err);
    }

    res.json(users);
  });
};