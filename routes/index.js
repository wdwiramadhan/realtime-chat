const express = require("express");
const app = express();
const auth = require('./auth');
const user = require('./user');
const chat = require('./chat');
const authenticate = require('../middleware/authenticate');

app.use('/auth', auth);
app.use('/chat',authenticate.isLoggedIn);
app.use('/api/user', user);
app.use('/api/chat', chat);


module.exports = app;