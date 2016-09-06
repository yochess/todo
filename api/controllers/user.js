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
  let userId;
  if (!req.session.passport) {
    userId = null;
  } else {
    userId = req.session.passport.user;
  }

  const friendId = req.params.id;

  db.User.findOne({
    where: {
      id: friendId
    },
    attributes: {
      exclude: ['password']
    }
  })
  .then(user => {
    db.Task.findAll({
      where: {
        userId: user.id,
        status: {
          $ne: '2'
        },
        privacy: {
          $ne: '2'
        }
      }
    })
    .then(tasks => {
      const obj = {};
      obj.user = user;

      if (!userId) {
        obj.tasks = tasks.filter(task => {
          return task.privacy !== '3';
        });
        return res.send(obj);
      }
      db.Friend.findOne({
        where: {
          userId,
          friendId,
          status: '2'
        }
      })
      .then(friend => {
        if (!friend) {
          obj.tasks = tasks.filter(task => {
            return task.privacy !== '3';
          });
          return res.send(obj);
        }
        obj.tasks = tasks;
        return res.send(obj);
      });

    })
    .catch(err => res.send(err));
  })
  .catch(err => next(err));
};

module.exports = {
  fetchUsers,
  fetchUser
};
