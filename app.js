'use strict';
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const SECRET = process.env.SECRET || 'asdf';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionFileStore = require('session-file-store');
const passport = require('./api/utils/passport.js');

const authRouter = require('./api/routes/auth.js');
const friendRouter = require('./api/routes/friend.js');
const taskRouter = require('./api/routes/task.js');

const app = express();
const fileStore = sessionFileStore(session);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: SECRET,
  resave: true,
  saveUninitialized: true,
  store: new fileStore(),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/friend', friendRouter);
app.use('/task', taskRouter);

app.get('/angular', (req, res) => {
  res.render('angular');
});

app.listen(PORT, () => {
  console.log(`${HOST} listening on port ${PORT}`);
});
