'use strict';
const express = require('express');
const friendRouter = express.Router();
const friendCtrl = require('../controllers/friend.js');
const passportMw = require('../utils/middlewares').passport;

friendRouter
  .get('/', passportMw.isAuth, friendCtrl.fetchFriends)
  .get('/awaiting', passportMw.isAuth, friendCtrl.fetchAwaitingFriends)
  .put('/awaiting/:id', passportMw.isAuth, friendCtrl.makeResponse)
  .post('/request/:id', passportMw.isAuth, friendCtrl.makeRequest)
  .get('/:id', passportMw.isAuth, friendCtrl.checkFriend);

module.exports = friendRouter;
