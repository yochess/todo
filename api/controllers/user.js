'use strict';
const db = require('../utils/dbconfig.js');

const fetchUsers = (req, res, next) => {
  db.User.findAll({}).then(users => {
    return res.send(users.map(user => {
      return {
        id: user.id,
        username: user.username
      };
    }));
  })
  .catch(err => next(err));
};

const fetchUser = (req, res, next) => {
  const id = req.params.id;

  db.User.findOne({where: {
    id
  }})
  .then(user => {
    if (!user) {
      return res.status(200).send('No Such User!');
    }
    return res.send({
      id: user.id,
      username: user.username,
      email: user.email,
      joinDate: user.createdAt
    })
  })
  .catch(err => next(err));
};

module.exports = {
  fetchUsers,
  fetchUser
};
