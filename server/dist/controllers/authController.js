'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifiEmail = exports.resendVerification = exports.signup = exports.signin = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _email = require('../helpers/email');

var _token = require('../helpers/token');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sign in
 */
var signin = exports.signin = function signin(req, res) {
  var _req$user = req.user;
  var firstname = _req$user.firstname;
  var lastname = _req$user.lastname;
  var email = _req$user.email;


  res.json({ token: (0, _token.tokenForUser)(req.user), firstname: firstname, lastname: lastname, email: email });
};

/**
 * Sign up
 */
var signup = exports.signup = function signup(req, res, next) {
  var _req$body = req.body;
  var firstname = _req$body.firstname;
  var lastname = _req$body.lastname;
  var email = _req$body.email;
  var password = _req$body.password;


  if (!firstname || !lastname || !email || !password) {
    return res.status(422).send({ error: "all fields are required" });
  }

  _user2.default.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    var user = new _user2.default({ firstname: firstname, lastname: lastname, email: email, password: password });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      (0, _email.sendVerificationEmail)(email, firstname, user.auth.token);

      res.json({ firstname: firstname, lastname: lastname, email: email });
    });
  });
};

/**
 * Resend verification code
 */
var resendVerification = exports.resendVerification = function resendVerification(req, res, next) {
  var email = req.body.email;


  _user2.default.findOne({ email: email }, function (err, user) {
    if (err) {
      return next(err);
    }

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    _user2.default.findByIdAndUpdate(user.id, { auth: { used: false, token: user.auth.token, expires: tomorrow } }, function (err) {
      if (err) {
        return next(err);
      }

      var firstname = user.firstname;
      var email = user.email;


      (0, _email.sendVerificationEmail)(email, firstname, user.auth.token);

      res.json({ success: true });
    });
  });
};

/**
 * Verify email
 */
var verifiEmail = exports.verifiEmail = function verifiEmail(req, res, next) {
  var _req$body2 = req.body;
  var email = _req$body2.email;
  var token = _req$body2.token;


  _user2.default.findOne({ email: email }, function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(422).send({ error: { message: "User doesnt exists", resend: false } });
    }

    if (user.auth.used) {
      return res.status(422).send({ error: { message: "link already used", resend: false } });
    }

    if (new Date() > user.auth.expires) {
      return res.status(422).send({ error: { message: "link already expired", resend: true } });
    }

    if (token !== user.auth.token) {
      return res.status(422).send({ error: { message: "something has gone wrong, please sign up again", resend: false } });
    }

    _user2.default.findByIdAndUpdate(user.id, { role: 1, auth: { used: true } }, function (err) {
      if (err) {
        return next(err);
      }

      var email = user.email;
      var firstname = user.firstname;
      var lastname = user.lastname;


      res.json({ token: (0, _token.tokenForUser)(user), email: email, firstname: firstname, lastname: lastname });
    });
  });
};