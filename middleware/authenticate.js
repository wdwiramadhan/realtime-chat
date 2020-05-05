const checkAuthenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}
const checkNotAuthenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/chat')
  }
  next()
}
module.exports = {checkAuthenticate,checkNotAuthenticate}