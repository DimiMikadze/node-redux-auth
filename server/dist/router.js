'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _authController = require('./controllers/authController');

var _resetPasswordController = require('./controllers/resetPasswordController');

var _usersController = require('./controllers/usersController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passportService = require('./services/passport');

var requireAuth = _passport2.default.authenticate('jwt', { session: false });
var requireSignin = _passport2.default.authenticate('local', { session: false });

var router = function router(app) {
  app.get('/', requireAuth, _usersController.fetchUsers);
  app.post('/signup', _authController.signup);
  app.post('/signup/verify-email', _authController.verifiEmail);
  app.post('/resend-verify-code', _authController.resendVerification);
  app.post('/signin', requireSignin, _authController.signin);
  app.post('/reset-password', _resetPasswordController.resetPassword);
  app.post('/reset-password/verify', _resetPasswordController.verifyResetPassword);
  app.post('/reset-password/new', _resetPasswordController.resetPasswordNew);
};

exports.default = router;