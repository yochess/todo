'use strict';
const passport = require('passport');

const authenticate = (passportMethod) => {
  return (req, res, next) => {
    passport.authenticate(passportMethod, (err, proceed, info) => {
      if (err) {
        return next(err);
      }
      if (!proceed) {
        return res.status(info.status).send(info.message);
      }
      req.login(proceed, err => {
        if (err) {
          return next(err);
        }
        return next();
      });
    })(req, res, next);
  };
};

const isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(404).send('You are not authorized to perform this action!');
  }
  return next();
};

module.exports = {
  passport: {
    authenticate,
    isAuth
  }
};
