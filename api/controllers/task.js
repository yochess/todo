'use strict';
const db = require('../utils/dbconfig.js');

const fetchTasks = (req, res) => {
  const userId = req.session.passport.user;

  db.Task.findAll({
    where: {
      userId
    }
  })
  .then(tasks => res.send(tasks))
  .catch(err => next(err));
};

const createTask = (req, res, next) => {
  const userId = req.session.passport.user;
  const title = req.body.title;
  const description = req.body.description;
  let privacy;

  if (req.body.privacy === 'public') {
    privacy = 1;
  } else if (req.body.privacy === 'private') {
    privacy = 2;
  } else if (req.body.privacy === 'protected') {
    privacy = 3;
  } else {
    return res.status(404).send('Invalid Privacy Setting!');
  }

  db.Task.create({
    title,
    description,
    status: 1,
    privacy,
    userId
  })
  .then(task => res.send(task))
  .catch(err => next(err));
};

const editTask = (req, res, next) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  let privacy;

  if (req.body.privacy === 'public') {
    privacy = 1;
  } else if (req.body.privacy === 'private') {
    privacy = 2;
  } else if (req.body.privacy === 'protected') {
    privacy = 3;
  } else {
    return res.status(404).send('Invalid Privacy Setting!');
  }

  db.Task.findOne({
    where: {
      id
    }
  })
  .then(task => {
    task.updateAttributes({
      title,
      description,
      privacy
    })
    .then(updatedTask => res.status(201).send('Task Updated!'))
    .catch(err => next(err));
  })
  .catch(err => next(err));
};

const deleteTask = (req, res, next) => {
  const id = req.params.id;

  db.Task.findOne({
    where: {
      id
    }
  })
  .then(task => {
    task.updateAttributes({
      status: 2
    })
    .then(updatedTask => res.status(201).send('Deleted!'))
    .catch(err => next(err));
  })
  .catch(err => next(err));
};

module.exports ={
  fetchTasks,
  createTask,
  editTask,
  deleteTask
};
