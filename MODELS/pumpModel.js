const mongoose=require('mongoose')
const Schema=mongoose.Schema

const pumpSchema=new Schema({
    pumpName:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    fuelAvailable:[String],
    loc: {
        type: { type: String },
        coordinates: [Number],
       
    }

},{timestamps:true})

pumpSchema.index({ "loc": "2dsphere" });

const Pump=mongoose.model('Pump',pumpSchema)
module.exports=Pump