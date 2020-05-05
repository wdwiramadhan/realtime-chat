const express = require("express");
const app = express();
const auth = require('./auth');
const user = require('./user');
const chat = require('./chat');
const authenticate = require('../middleware/authenticate');

app.use('/', auth);
app.use('/user', authenticate.checkAuthenticate,user);
app.use('/chat', authenticate.checkAuthenticate,chat);


module.exports = app;