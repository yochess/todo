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

  db.User.findOne({
    where: {
      id
    },
    attributes: {
      exclude: ['password']
    }
  })
  .then(user => {
    db.Task.findAll({
      where: {
        userId: user.id,
        status: '1',
        privacy: {
          $ne: '2'
        }
      }
    })
    .then(tasks => {
      const obj = {};
      obj.user = user;
      obj.tasks = tasks;
      return res.send(obj);
    })
    .catch(err => res.send(err));
  })
  .catch(err => next(err));
};

module.exports = {
  fetchUsers,
  fetchUser
};
