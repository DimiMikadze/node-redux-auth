'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendVerificationEmail = sendVerificationEmail;
exports.sendResetPassword = sendResetPassword;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-template */

var transporter = _nodemailer2.default.createTransport(_config.emailConfig);

var from = 'Redux Auth Team';

function sendVerificationEmail(email, firstName, token) {
  var html = "<div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>" + "<div style='background-color: #f2f2f2; padding: 45px;'>" + "<div style='background-color: #ffffff; padding: 40px; text-align: center;'>" + "<h1 style='color: #5f5f5f; margin-bottom: 30px;'>Hi, " + firstName + "</h1>" + "<p style='color: #5f5f5f;'>Click the big button below to activate your account.</p>" + "<a href='" + _config.ROOT_URL + "/reduxauth/verify-email/?email=" + email + "&token=" + token + "' style='background-color: #288feb; color: #fff; padding: 14px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;'>Activate Account</a>" + "</div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>Redux Auth Team</h3></div></div>";

  transporter.sendMail({
    from: from,
    to: email,
    subject: 'Verify Email',
    html: html
  }, function (err) {
    if (err) {
      return err;
    }
  });
}

function sendResetPassword(email, firstName, token) {
  var html = "<div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>" + "<div style='background-color: #f2f2f2; padding: 45px;'>" + "<div style='background-color: #ffffff; padding: 40px; text-align: center;'>" + "<h1 style='color: #5f5f5f; margin-bottom: 30px;'>Hi, " + firstName + "</h1>" + "<p style='color: #5f5f5f; line-height: 22px;'>We've received a request to reset your password. if you didn't make the request, just ignore this email. Otherwise, you can reset your password using this link</p>" + "<a href='" + _config.ROOT_URL + "/reduxauth/reset-password/new?email=" + email + "&token=" + token + "' style='background-color: #288feb; color: #fff; padding: 14px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;'>Click here to reset your password</a>" + "</div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>Redux Auth Team</h3></div></div>";

  transporter.sendMail({
    from: from,
    to: email,
    subject: 'Password Reset',
    html: html
  }, function (err) {
    if (err) {
      return err;
    }
  });
}