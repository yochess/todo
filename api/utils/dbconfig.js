'use strict';
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/todo'

const Sequelize = require('sequelize');
const sequelize = new Sequelize(DATABASE_URL, {
  logging: false
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING
});

const Friend = sequelize.define('friend', {
  status: Sequelize.STRING
});

const Task = sequelize.define('task', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  status: Sequelize.STRING,
  privacy: Sequelize.STRING
});


User.hasMany(Friend);
User.hasMany(Task);
Friend.belongsTo(User, {as: 'user'});
Friend.belongsTo(User, {as: 'friend'});
Task.belongsTo(User);

sequelize.sync();

module.exports = {
  User,
  Friend,
  Task
};
