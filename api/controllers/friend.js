'use strict';
const db = require('../utils/dbconfig.js');

const fetchFriends = (req, res, next) => {
  const userId = req.session.passport.user;

  db.Friend.findAll({
    where: {
      userId
    }
  })
  .then(friends => {
    res.send(friends);
  })
};

const fetchRequests = (req, res, next) => {
  const userId = req.session.passport.user;
  db.Friend.findAll({
    where: {
      userId,
      status: '1'
    }
  })
  .then(friends => res.send(friends))
  .catch(err => next(err));
};

const fetchResponses = (req, res, next) => {
  const userId = req.session.passport.user;
  db.Friend.findAll({
    where: {
      friendId: userId,
      status: '1'
    }
  })
  .then(friends => res.send(friends))
  .catch(err => next(err));
}

const makeRequest = (req, res, next) => {
  const userId = req.session.passport.user;
  const friendId = req.body.friendId;

  db.Friend.findOne({where: {userId, friendId}})
    .then(friendExist => {
      if (friendExist && friendExist.status === 1) {
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
  const id = req.params.id;
  const status = req.body.status;

  if (status !== '2' && status !== '3') {
    return res.status(404).send('You are attempting an invalid operation!');
  }

  db.Friend.findOne({
    where: {
      friendId: userId,
      id
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
  fetchRequests,
  fetchResponses,
  makeRequest,
  makeResponse
};
