const { string } = require('joi')
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const vehicleSchema=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    vehicleType:{
        type:String,
        required:true
    },
    vehicleName:{
        type:String,
        required:true
    },
    fuelType:{
        type:String,
        required:true
    },
    vehicleNumber:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

const Vehicle=mongoose.model('Vehicle',vehicleSchema)
module.exports=Vehicle