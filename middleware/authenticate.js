const isLoggedIn = async(req, res, next) => {
  try{
    if(req.session.isLoggedIn){
      next()
    }else{
      res.redirect('/');
    }
  }catch(err){
    console.log(err)
  }
}

module.exports = {isLoggedIn}