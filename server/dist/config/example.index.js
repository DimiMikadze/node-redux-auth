'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dbConfig = exports.dbConfig = {
  secret: 'SomeRandomSecretString',
  db: 'mongodb://localhost:auth/auth'
};

var emailConfig = exports.emailConfig = {
  service: 'Gmail',
  auth: {
    user: 'email@gmail.com',
    pass: 'Password'
  }
};