'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPasswordNew = exports.verifyResetPassword = exports.resetPassword = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _config = require('../config');

var _email = require('../helpers/email');

var _token = require('../helpers/token');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Reset password
 */
var resetPassword = exports.resetPassword = function resetPassword(req, res, next) {
  var email = req.body.email;

  _user2.default.findOne({ email: email }, function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(422).send({ error: "email doesn't exists" });
    }

    var token = (0, _token.tokenForUser)(user);

    var afterOneHour = new Date();
    afterOneHour.setHours(afterOneHour.getHours() + 1);

    _user2.default.findByIdAndUpdate(user.id, { resetPassword: { token: token, used: 0, expires: afterOneHour } }, function (err) {
      if (err) {
        return next(err);
      }

      (0, _email.sendResetPassword)(email, user.firstname, token);

      res.json({ success: true });
    });
  });
};

/**
 * Verify reset password
 */
var verifyResetPassword = exports.verifyResetPassword = function verifyResetPassword(req, res, next) {
  var _req$body = req.body;
  var email = _req$body.email;
  var token = _req$body.token;


  _user2.default.findOne({ email: email }, function (err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(422).send({ error: { message: "email doesn't exists", resend: false } });
    }

    if (user.resetPassword.used) {
      return res.status(422).send({ error: { message: "link already used, please request reset password again", resend: true } });
    }

    if (new Date() > user.resetPassword.expires) {
      return res.status(422).send({ error: { message: "link already expired, please request reset password again", resend: true } });
    }

    if (token !== user.resetPassword.token) {
      return res.status(422).send({ error: { message: "something has gone wrong, please request reset password again", resend: true } });
    }

    res.json({ success: true });
  });
};

/**
 * Reset password, new password
 */
var resetPasswordNew = exports.resetPasswordNew = function resetPasswordNew(req, res, next) {
  var _req$body2 = req.body;
  var email = _req$body2.email;
  var newpassword = _req$body2.newpassword;
  var token = _req$body2.token;


  _user2.default.findOne({ email: email }, function (err, user) {
    if (!user) {
      return res.status(422).send({ error: { message: "email doesn't exists", resend: false } });
    }

    if (user.resetPassword.used) {
      return res.status(422).send({ error: { message: "link already used, please request reset password again", resend: true } });
    }

    if (new Date() > user.resetPassword.expires) {
      return res.status(422).send({ error: { message: "link already expired, please request reset password again", resend: true } });
    }

    if (token !== user.resetPassword.token) {
      return res.status(422).send({ error: { message: "something has gone wrong, please request reset password again", resend: true } });
    }

    _bcryptNodejs2.default.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }

      _bcryptNodejs2.default.hash(newpassword, salt, null, function (err, hash) {
        if (err) {
          return next(err);
        }

        _user2.default.findByIdAndUpdate(user.id, { password: hash, resetPassword: {} }, function (err) {
          if (err) {
            return next(err);
          }

          var firstname = user.firstname;
          var lastname = user.lastname;
          var email = user.email;


          res.json({ firstname: firstname, lastname: lastname, email: email, token: (0, _token.tokenForUser)(user) });
        });
      });
    });
  });
};