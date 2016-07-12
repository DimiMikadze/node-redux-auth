import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt-nodejs';
import User from '../models/user';
import { sendVerificationEmail } from '../helpers/email';
import { tokenForUser } from '../helpers/token';

/**
 * Sign in
 */
export const signin = (req, res) => {
  const { firstname, lastname, email } = req.user;

  res.json({ token: tokenForUser(req.user), firstname, lastname, email });
};

/**
 * Sign up
 */
export const signup = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(422).send({ error: "all fields are required" });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const user = new User({ firstname, lastname, email, password });

    user.save((err) => {
      if (err) { return next(err); }

      sendVerificationEmail(email, firstname, user.auth.token);

      res.json({ firstname, lastname, email });
    });
  });
};

/**
 * Resend verification code
 */
export const resendVerification = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) { return next(err); }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    User.findByIdAndUpdate(user.id, { auth: { used: false, token: user.auth.token, expires: tomorrow } }, (err) => {
      if (err) { return next(err); }

      const { firstname, email } = user;

      sendVerificationEmail(email, firstname, user.auth.token);

      res.json({ success: true });
    });
  });
};

/**
 * Verify email
 */
export const verifiEmail = (req, res, next) => {
  const { email, token } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) { return next(err); }

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

    User.findByIdAndUpdate(user.id, { role: 1, auth: { used: true } }, (err) => {
      if (err) { return next(err); }

      const { email, firstname, lastname } = user;

      res.json({ token: tokenForUser(user), email, firstname, lastname });
    });
  });
};
