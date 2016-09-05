'use strict';
const express = require('express');
const friendRouter = express.Router();
const friendCtrl = require('../controllers/friend.js');
const passportMw = require('../utils/middlewares').passport;

friendRouter
  .get('/', passportMw.isAuth, friendCtrl.fetchFriends)
  .get('/request', passportMw.isAuth, friendCtrl.fetchRequests)
  .post('/request', passportMw.isAuth, friendCtrl.makeRequest)
  .put('/response/:id', passportMw.isAuth, friendCtrl.makeResponse);

module.exports = friendRouter;
