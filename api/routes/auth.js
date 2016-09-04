'use strict';
const express = require('express');
const authRouter = express.Router();
const authCtrl = require('../controllers/auth.js');
const passportMw = require('../utils/middlewares').passport;

authRouter
  .post('/login', passportMw.authenticate('local-login'), authCtrl.login)
  .post('/signup', passportMw.authenticate('local-signup'), authCtrl.signup)
  .get('/isAuth', authCtrl.isAuth)
  .get('/logout', authCtrl.logout);

module.exports = authRouter;
