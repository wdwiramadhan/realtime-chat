const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const authenticate = require('../middleware/authenticate');
const passport = require('passport');
const initialize = require('../config/passport')
initialize();

router.get('/', authenticate.checkNotAuthenticate, auth.login);
router.post('/login',authenticate.checkNotAuthenticate, passport.authenticate('local', {
  successRedirect: '/chat',
  failureRedirect: '/',
}));
router.get('/register', authenticate.checkNotAuthenticate, auth.register)
router.post('/register', authenticate.checkNotAuthenticate,auth._register);
router.post('/logout',authenticate.checkNotAuthenticate, auth.logout);

module.exports = router
