const { string } = require('joi')
const mongoose=require('mongoose')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can not contain passwod')
            }
        }
    },
    phoneNumber:{
        type:String,
        required:true,
        validate: {
            validator: function(v) {
                var reg= /^\d{6,15}$/;
                return (v == null || v.trim().length < 1) || reg.test(v)
            },
            message: 'Provided phoneNumber is invalid.'
        }
    },
    status:{
        type:String,
        default:'active',
        enum:['active','deleted','blocked']
    },
    
     token:{
            type:String,
            required:true
        },

    Image:{
        type:String
    }

},{timestamps:true})



//.............................................................
const User=mongoose.model('User',userSchema)
module.exports=User