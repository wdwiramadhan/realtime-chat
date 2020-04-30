const mongosee = require('mongoose');

const UserSchema = new mongosee.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
  },
  createdAt:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongosee.model('User', UserSchema);