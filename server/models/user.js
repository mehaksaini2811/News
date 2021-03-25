const mongoose = require("mongoose");
//const validator=require('validator')
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
require('dotenv').config()
const saltRounds = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    //validate:[validator.isEmailValid,'invalid email']
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  name: {
    type: String,
    require: true,
    maxLength: 100,
  },
  lastname: {
    type: String,
    maxLength: 100,
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          return next(err);
        }
        console.log('here')
        bcrypt.hash(user.password, salt, function (err, hash) {
          if (err) {
            return next(err);
          }
          console.log('here now')
          user.password = hash;
          console.log('password:'+hash)
          next()
        });
      });
  }
  else{
      next()
  }
  
});

userSchema.methods.generateToken=async function(){
    var user=this
    var token=jwt.sign({email:user.email},process.env.SECRET,{
        expiresIn:'7d'
    })
    user.token=token
    return user.save()
}

const User = mongoose.model("User", userSchema);
module.exports = { User };
