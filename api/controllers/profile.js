'use strict';
const db = require('../utils/dbconfig.js');

const fetchMe = (req, res, next) => {
  const id = req.session.passport.user;

  db.User.findOne({
    where: {
      id
    }
  })
  .then(user => res.send(user))
  .catch(err => next(err));
};

const fetchProfile = (req, res, next) => {
  const id = req.params.id;

  db.User.findOne({where: {
    id
  }})
  .then(user => res.send(user))
  .catch(err => next(err));
};


module.exports = {
  fetchMe,
  fetchProfile
}
