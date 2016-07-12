'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dbConfig = exports.dbConfig = {
  secret: 'Secret',
  db: 'mongodb://localhost:auth/auth'
};

var emailConfig = exports.emailConfig = {
  service: 'Gmail',
  auth: {
    user: 'reduxauth@gmail.com',
    pass: 'd1m1tr111'
  }
};

var ROOT_URL = exports.ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://dimitrimikadze.com:3000' : 'http://localhost:3000';