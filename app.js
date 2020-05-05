const express = require("express");
const bodyParses = require("body-parser");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const routes = require('./routes/index');
const session = require('express-session');
const db = require('./config/db');
const exphbs  = require('express-handlebars');
const passport = require('passport')
const port = process.env.PORT || 3000;

app.use(bodyParses.json());
app.use(bodyParses.urlencoded({ extended: false }));

db.connectDB();

app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

io.on("connection", function (socket) {
  socket.on('join', function (data) {
    socket.join(data.email); 
  });
  socket.on('chat message', (data) => {
    io.sockets.in(data.receiver).emit('chat message', {message:data.message, sender:data.sender});
  });
});

app.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})

http.listen(port, () => {
  console.log('Server running on port '+port)
})
