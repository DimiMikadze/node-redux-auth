import User from '../models/user';

/**
 * List all users
 */
export const fetchUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) { return next(err); }

    res.json(users);
  });
};
