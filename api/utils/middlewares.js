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

module.exports = {
  passport: {
    authenticate
  }
};
