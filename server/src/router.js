import passport from 'passport';
import { signin, signup, verifiEmail, resendVerification } from './controllers/authController';
import { resetPassword, verifyResetPassword, resetPasswordNew } from './controllers/resetPasswordController';
import { fetchUsers } from './controllers/usersController';
import passportService from './services/passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = (app) => {
  app.get('/', requireAuth, fetchUsers);
  app.post('/signup', signup);
  app.post('/signup/verify-email', verifiEmail);
  app.post('/resend-verify-code', resendVerification);
  app.post('/signin', requireSignin, signin);
  app.post('/reset-password', resetPassword);
  app.post('/reset-password/verify', verifyResetPassword);
  app.post('/reset-password/new', resetPasswordNew);
};

export default router;
