const express = require("express");
const bodyParses = require("body-parser");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const routes = require('./routes/index');
const session = require('express-session');
const db = require('./config/db');
const path = require('path');
const port = process.env.PORT || 3000;

app.use(bodyParses.json());
app.use(bodyParses.urlencoded({ extended: false }));
db.connectDB();
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true
}));
io.on('connection', (socket)=>{
  console.log('user connected');
});
app.use('/', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/login.html'))
})
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/register.html'))
})
app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/chat.html'))
})

http.listen(port, () => {
  console.log('Server running on port '+port)
})
