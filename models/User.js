const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  account:{
    type:{
      type:String,
      require:true
    },
    uid:String,
    password:String,
  },
  createdAt:{
    type:Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema);