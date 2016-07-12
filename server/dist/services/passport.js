'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../config');

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var localOptions = { usernameField: 'email' };
var localLogin = new _passportLocal2.default(localOptions, function (email, password, done) {
  _user2.default.findOne({ email: email }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      if (user.role < 1) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: _config.dbConfig.secret
};

var jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  _user2.default.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

_passport2.default.use(jwtLogin);
_passport2.default.use(localLogin);