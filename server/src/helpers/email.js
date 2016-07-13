/* eslint-disable prefer-template */
import nodemailer from 'nodemailer';
import { emailConfig, ROOT_URL } from '../config';
const transporter = nodemailer.createTransport(emailConfig);

const from = 'Redux Auth Team';

export function sendVerificationEmail(email, firstName, token) {
  const html = "<div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>" +
    "<div style='background-color: #f2f2f2; padding: 45px;'>" +
    "<div style='background-color: #ffffff; padding: 40px; text-align: center;'>" +
    "<h1 style='color: #5f5f5f; margin-bottom: 30px;'>Hi, " + firstName + "</h1>" +
    "<p style='color: #5f5f5f;'>Click the big button below to activate your account.</p>" +
    "<a href='" + ROOT_URL + "/reduxauth/verify-email/?email=" + email + "&token=" + token + "' style='background-color: #288feb; color: #fff; padding: 14px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;'>Activate Account</a>" +
    "</div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>Redux Auth Team</h3></div></div>";

  transporter.sendMail({
    from,
    to: email,
    subject: 'Verify Email',
    html,
  }, (err) => { if (err) { return err; } });
}

export function sendResetPassword(email, firstName, token) {
  const html = "<div style='margin: 0; padding: 0; width: 100%; font-family: Trebuchet MS, sans-serif;'>" +
    "<div style='background-color: #f2f2f2; padding: 45px;'>" +
    "<div style='background-color: #ffffff; padding: 40px; text-align: center;'>" +
    "<h1 style='color: #5f5f5f; margin-bottom: 30px;'>Hi, " + firstName + "</h1>" +
    "<p style='color: #5f5f5f; line-height: 22px;'>We've received a request to reset your password. if you didn't make the request, just ignore this email. Otherwise, you can reset your password using this link</p>" +
    "<a href='" + ROOT_URL + "/reduxauth/reset-password/new?email=" + email + "&token=" + token + "' style='background-color: #288feb; color: #fff; padding: 14px; text-decoration: none; border-radius: 5px; margin-top: 20px; display: inline-block;'>Click here to reset your password</a>" +
    "</div> <h3 style='color: #5f5f5f; text-align: center; margin-top: 30px;'>Redux Auth Team</h3></div></div>";

  transporter.sendMail({
    from,
    to: email,
    subject: 'Password Reset',
    html,
  }, (err) => { if (err) { return err; } });
}
