const mongoose = require('mongoose');

//Registring User's Using Theese Rules Called Schema

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,

  },
  
});

module.exports = mongoose.model('User' , userSchema);