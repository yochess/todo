'use strict';
const express = require('express');
const userRouter = express.Router();
const userCtrl = require('../controllers/user.js');
const passportMw = require('../utils/middlewares').passport;

userRouter
  .get('/', userCtrl.fetchUsers)
  .get('/:id', userCtrl.fetchUser);

module.exports = userRouter;
