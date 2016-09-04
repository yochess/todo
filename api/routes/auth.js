'use strict';
const express = require('express');
const passport = require('passport');
const passportMw = require('../utils/middlewares').passport;
const authCtrl = require('../controllers/auth.js');
const authRouter = express.Router();

authRouter
  .post('/login', passportMw.authenticate('local-login'), authCtrl.login)
  .post('/signup', passportMw.authenticate('local-signup'), authCtrl.signup)
  .get('/isAuth', authCtrl.isAuth)
  .get('/logout', authCtrl.logout);

module.exports = authRouter;
