const User = require('../models/User');
const bcrypt = require('bcrypt');

const login  = (req, res) => {
  res.render('login');
}
const register = (req, res) => {
  res.render('register');
}

const _register = async (req, res) => {
  try{
    const data = {
      name : req.body.name,
      email : req.body.email,
      account:{
        type: 'local',
        uid: null,
        password : bcrypt.hashSync(req.body.password,12)
      }
    }
    const user = await User.create(data)
    if(user){
      res.redirect('/');
    }
  }catch(err){
    console.log(err);
  }
};

const logout  = (req, res) => {
  req.logOut()
  res.redirect('/')
}

module.exports = {
  login,
  register,
  _register,
  logout,
};
