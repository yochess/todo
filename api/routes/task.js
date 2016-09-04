'use strict';
const express = require('express');
const taskRouter = express.Router();
const taskCtrl = require('../controllers/task.js');
const passportMw = require('../utils/middlewares').passport;

taskRouter
  .get('/', passportMw.isAuth, taskCtrl.fetchTasks)
  .post('/', passportMw.isAuth, taskCtrl.createTask)
  .put('/:id', passportMw.isAuth, taskCtrl.editTask)
  .delete('/:id', passportMw.isAuth, taskCtrl.deleteTask);

module.exports = taskRouter;
