const Chat = require('../models/Chat')

const index = async(req, res) => {
  try{
    const chat = await Chat.find();
    if(chat){
      return res.status(200).json({
        success : true,
        data : chat
      })
    }
  }catch(err){
    console.log(err)
  }
}

const show = async(req, res) => {
  try{
    const sender  = req.session.email;
    const receiver = req.params.id;
    const chat = await Chat.find({$or: [{sender:sender,receiver:receiver},{sender:receiver,receiver:sender}]});
    if(chat){
      return res.status(200).json({
        success : true,
        data : chat
      })
    }
  }catch(err){
    console.log(err)
  }
}

const store = async(req, res) => {
  try{
    const sender  = req.session.email;
    const {message, receiver} = req.body;
    const chat = await Chat.create({message, sender, receiver});
    if(chat){
      console.log('success');
    }
    return;
  }catch(err){
    console.log(err);
  }
}

module.exports = {
  index,
  store,
  show
}