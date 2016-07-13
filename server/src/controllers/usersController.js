import User from '../models/user';

/**
 * Fetch user firstnames
 */
export const fetchUsers = (req, res, next) => {
  User.find({}, 'firstname', (err, users) => {
    if (err) { return next(err); }

    res.json(users);
  });
};
