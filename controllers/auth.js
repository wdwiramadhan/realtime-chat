const User = require('../models/User');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email:email})
    if(user){
      if(bcrypt.compareSync(password, user.password)){
        req.session.name = user.name;
        req.session.email = user.email;
        req.session.isLoggedIn = true;
        res.redirect('/chat');
      }else{
        console.log('wrong password')
      }
    }else{
      console.log('email not found')
    }
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  try{
    const data = {
      name : req.body.name,
      email : req.body.email,
      password : bcrypt.hashSync(req.body.password,12)
    }
    const user = await User.create(data)
    if(user){
      res.redirect('/');
    }
  }catch(err){
    console.log(err);
  }
};

module.exports = {
  login,
  register,
};
