const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt')
const User = require('../models/User');
require("dotenv").config();


const initialize = () => {
  const authenticate = async(email, password, done) => {
    try{
      const user = await User.findOne({email:email});
      if(!user){
        return done(null, false, { message: 'No user with that email' })
      }
      if(user.account.type != 'local'){
        return done(null, false, { message: 'No user with that email' })
      }
      if(await bcrypt.compareSync(password, user.account.password)){
        done(null, user)
      }else{
        done(null, false, { message: 'Password incorrect' })
      }

    }catch(err){
      return done(err);
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'email' },authenticate))
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/login/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  async(accessToken, refreshToken, profile, done) => {
    try{
      var user = await User.findOne({email:profile.emails[0].value});
      if(user == null){
        const data = {
          name : profile.name.familyName,
          email : profile.emails[0].value,
          account: {
            type:profile.provider,
            uid:profile.id
          }
        }
        user = await User.create(data);
        return done(null, user);
      }
      if(user){
        return done(null, user);
      }
    }catch(err){
      return done(err);
    }
  }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });
  
  passport.deserializeUser(function(email, done) {
    User.findOne({email:email}, function(err, user) {
      done(null, user);
    });
  });
}

module.exports = initialize

