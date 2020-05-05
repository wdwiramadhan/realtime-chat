const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User');


const initialize = () => {
  const authenticate = async(email, password, done) => {
    try{
      const user = await User.findOne({email:email});
      if(!user){
        return done(null, false, { message: 'No user with that email' })
      }
      if(await bcrypt.compareSync(password, user.password)){
        return done(null, user)
      }else{
        return done(null, false, { message: 'Password incorrect' })
      }

    }catch(err){
      return done(err);
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'email' },authenticate))
  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });
  
  passport.deserializeUser(function(email, done) {
    User.findOne({email:email}, function(err, user) {
      done(err, user);
    });
  });
}

module.exports = initialize

