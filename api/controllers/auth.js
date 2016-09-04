'use strict';
const login = (req, res) => {
  return res.status(201).send('User has Successfully Login!');
};

const signup = (req, res) => {
  return res.status(201).send('User has Successfully Signup!');
};

const isAuth = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(404).send('User is not Authenticated!');
  }
  return res.status(200).send('User is Authenticated!');
};

const logout = (req, res) => {
  req.logout();
  return res.send('Logged Out!');
};

module.exports = {
  login,
  signup,
  isAuth,
  logout
};
