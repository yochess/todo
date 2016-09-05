'use strict';
const express = require('express');
const profileRouter = express.Router();
const profileCtrl = require('../controllers/profile.js');
const passportMw = require('../utils/middlewares').passport;

profileRouter
  .get('/', passportMw.isAuth, profileCtrl.fetchMe)
  .get('/users', profileCtrl.fetchUsers)
  .get('/friends', passportMw.isAuth, profileCtrl.fetchFriends)
  .get('/:id', profileCtrl.fetchProfile);

module.exports = profileRouter;
