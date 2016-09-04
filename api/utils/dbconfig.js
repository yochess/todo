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
});

const Task = sequelize.define('task', {
  title: Sequelize.STRING,
  description: Sequelize.STRING
});

const Privacy = sequelize.define('privacy', {
  type: Sequelize.STRING
});

User.hasMany(Friend);
User.hasMany(Task);
Friend.belongsTo(User, {as: 'user'});
Friend.belongsTo(User, {as: 'friend'});
Task.belongsTo(User);
Task.hasOne(Privacy);
Privacy.belongsTo(Task);

sequelize.sync();

module.exports = {
  User,
  Friend,
  Task,
  Privacy
};
