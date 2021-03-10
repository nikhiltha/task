const { string } = require('joi')
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const bookingSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    pumpId:{
        type:Schema.Types.ObjectId,
        ref:'Pump',
        required:true,
        index:true
    },
    vehicleTypes:[String],
    fuelTypes:[String],
 
    fillBy:{
        type:Schema.Types.ObjectId,
        ref:'pumpEmploye'
    },
    status:{
        type:String,
        default:'pending',
        enum:['confirm','pending']
    }

},{timestamps:true})

const Booking=mongoose.model('Booking',bookingSchema)
module.exports=Booking