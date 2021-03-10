const mongoose=require('mongoose')
const Schema=mongoose.Schema

const pumpEmployeSchema=new Schema({
    pumpId:{
        type:Schema.Types.ObjectId,
        ref:'Pump',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
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
    }
},{timestamps:true})

const pumpEmploye=mongoose.model('pumpEmploye',pumpEmployeSchema)
module.exports=pumpEmploye