const express = require("express");
const bodyParses = require("body-parser");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const routes = require('./routes/index');
const session = require('express-session');
const db = require('./config/db');
const exphbs  = require('express-handlebars');
const port = process.env.PORT || 3000;

app.use(bodyParses.json());
app.use(bodyParses.urlencoded({ extended: false }));

db.connectDB();

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use('/', routes);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.get('/', (req, res) => {
  res.render('login');
})
app.get('/register', (req, res) => {
  res.render('register');
})
app.get('/chat', (req, res) => {
  res.render('chat',{email:req.session.email});
})

io.on("connection", function (socket) {
  socket.on('join', function (data) {
    socket.join(data.email); 
  });
  socket.on('chat message', (data) => {
    io.sockets.in(data.receiver).emit('chat message', {message:data.message, sender:data.sender});
  });
});

http.listen(port, () => {
  console.log('Server running on port '+port)
})
