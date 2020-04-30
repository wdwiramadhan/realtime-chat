const User = require('../models/User')

const index = async(req, res) => {
  try{
    const user = await User.find({email: {$ne: req.session.email}});
    if(user){
      return res.status(200).json({
        success : true,
        data : user
      })
    }
  }catch(err){
    console.log(err)
  }
}

module.exports = {
  index
}