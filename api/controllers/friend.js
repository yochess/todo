'use strict';
const db = require('../utils/dbconfig.js');

const fetchFriends = (req, res, next) => {
  const userId = req.session.passport.user;

  db.Friend.findAll({
    where: {
      userId,
      status: {
        $ne: '3'
      }
    }
  })
  .then(friends => {
    Promise.all(friends.map(friend => {
      return db.User.findOne({
        where: {
          id: friend.friendId
        },
        attributes: {
          exclude: ['password']
        }
      });
    }))
    .then(allFriends => {
      const obj = allFriends.map((oneFriend, index) => {
        return {
          id: oneFriend.id,
          email: oneFriend.email,
          createdAt: oneFriend.createdAt,
          username: oneFriend.username,
          updatedAt: oneFriend.updatedAt,
          status: friends[index].status
        };
      });
      return res.send(obj);
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
};

const checkFriend = (req, res, next) => {
  const userId = req.session.passport.user;
  const friendId = req.params.id;

  db.Friend.findOne({
    where: {
      userId,
      friendId,
      status: {
        $ne: '3'
      }
    }
  })
  .then(isFriend => {
    if (!isFriend) {
      return res.status(200).send({bool: false});
    }
    return res.status(200).send({bool: true, data: isFriend});
  });
};

const fetchAwaitingFriends = (req, res, next) => {
  const userId = req.session.passport.user;

  db.Friend.findAll({
    where: {
      friendId: userId,
      status: '1'
    }
  })
  .then(friends => {
    Promise.all(friends.map(friend => {
      return db.User.findOne({
        where: {
          id: friend.userId
        },
        attributes: {
          exclude: ['password']
        }
      });
    }))
    .then(allFriends => {
      const obj = allFriends.map((oneFriend, index) => {
        return {
          id: oneFriend.id,
          email: oneFriend.email,
          createdAt: oneFriend.createdAt,
          username: oneFriend.username,
          updatedAt: oneFriend.updatedAt,
          status: friends[index].status
        };
      });
      return res.send(obj);
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
}

const makeRequest = (req, res, next) => {
  const userId = req.session.passport.user;
  const friendId = req.params.id;

  if (+userId === +friendId) {
    return res.status(404).send('you cannot friend yourself!');
  }

  db.Friend.findOne({
    where: {
      userId,
      friendId,
      status: {
        $ne: '3'
      }
    }
  })
  .then(friendExist => {
    if (friendExist && friendExist.status === '1') {
      return res.status(409).send('Request Already Pending!');
    }
    db.Friend.create({
      status: '1',
      userId,
      friendId
    })
    .then(friend => res.status(201).send('Friend Request is Made!'))
    .catch(err => next(err));
  })
  .catch(err => next(err));
};

const makeResponse = (req, res, next) => {
  const userId = req.session.passport.user;
  const friendId = req.params.id;
  const status = req.body.status;

  if (status !== '2' && status !== '3') {
    return res.status(404).send('You are attempting an invalid operation!');
  }

  db.Friend.findOne({
    where: {
      friendId: userId,
      userId: friendId
    }
  })
  .then(friend => {
    friend.updateAttributes({
      status
    })
    .then(updatedFriend => {
      if (status === '3') {
        return res.status(201).send('You have declined the request!');
      }
      db.Friend.create({
        userId,
        friendId: updatedFriend.userId,
        status: '2'
      })
      .then(newFriend => res.status(201).send('You have accepted the request!'))
      .catch(err => next(err));
    })
    .catch(err => next(err));
  })
  .catch(err => next(err));
};

module.exports = {
  fetchFriends,
  checkFriend,
  fetchAwaitingFriends,
  makeRequest,
  makeResponse
};
