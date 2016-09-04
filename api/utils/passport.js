'use strict';
// note: bcrypt is not yet implemented!

const db = require('./dbconfig.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User
    .findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

passport.use('local-signup', new LocalStrategy(
{passReqToCallback: true},
(req, username, password, done) => {
  db.User
    .findOne({where: {username}})
    .then(userExist => {
      if (userExist) {
        return done(null, false, {
          status: 409,
          message: 'User Exists!'
        });
      }
      db.User
        .create({username, password})
        .then(newUser => done(null, newUser))
        .catch(err => done(err));
    })
    .catch(err => done(err));
}));

passport.use('local-login', new LocalStrategy(
{passReqToCallback: true},
(req, username, password, done) => {
  db.User
    .findOne({where: {username}})
    .then(user => {
      if (!user) {
        return done(null, false, {
          status: 404,
          message: 'Incorrect Username or Password!'
        });
      }
      if (password !== user.password) {
        return done(null, false, {
          status: 404,
          message: 'Incorrect Username or password!'
        });
      }
      return done(null, user);
    })
    .catch(err => done(err));
}));

module.exports = passport;
