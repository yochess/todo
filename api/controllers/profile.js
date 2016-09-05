'use strict';
const db = require('../utils/dbconfig.js');

const fetchProfile = (req, res, next) => {
  const id = req.session.passport.user;

  db.User.findOne({
    where: {
      id
    }
  })
  .then(user => res.send(user))
  .catch(err => next(err));
};

const editProfile = (req, res, next) => {
  const id = req.session.passport.user;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  db.User.findOne({
    where: {
      id
    }
  })
  .then(user => {
    user.updateAttributes({
      username,
      password,
      email
    })
    .then(updatedUser => res.status(201).send(updatedUser))
  })
  .catch(err => next(err))
};

module.exports = {
  fetchProfile,
  editProfile
};
