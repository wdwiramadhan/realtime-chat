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

router.get('/login/facebook',authenticate.checkNotAuthenticate, passport.authenticate('facebook'));
router.get('/login/facebook/callback',authenticate.checkNotAuthenticate, passport.authenticate('facebook', {
  scope: ['email'],
  successRedirect: '/chat',
  failureRedirect: '/',
}));

module.exports = router
