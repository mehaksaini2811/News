const mongoose=require('mongoose')
//const validator=require('validator')

const userSchema =mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
        //validate:[validator.isEmailValid,'invalid email']
    },
    password:{
        type:String,
        required:true,
        minLength:5
    },
    name:{
        type:String,
        require:true,
        maxLength:100
    },
    lastname:{
        type:String,
        maxLength:100
    },
    token:{
        type:String
    }
})

const User=mongoose.model('User',userSchema)
module.exports=({User})