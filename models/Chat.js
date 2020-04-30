const mongosee = require('mongoose');

const ChatSchema = new mongosee.Schema({
  message:{
    type:String,
    required:true
  },
  sender:{
    type:String,
    required:true
  },
  receiver:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongosee.model('Chat', ChatSchema);