'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: { type: String, lowercase: true, unique: true },
  password: String,
  role: { type: Number, default: 0 },
  auth: {
    token: String,
    used: Boolean,
    expires: Date
  },
  resetPassword: {
    token: String,
    used: Boolean,
    expires: Date
  }
});

userSchema.pre('save', function (next) {
  var user = this;

  _bcryptNodejs2.default.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    _bcryptNodejs2.default.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      user.password = hash;
      user.auth = { token: salt, used: 0, expires: tomorrow };
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  _bcryptNodejs2.default.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

exports.default = _mongoose2.default.model('user', userSchema);