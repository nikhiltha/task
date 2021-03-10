const pump=require('../MODELS/pumpModel');
const pumpEmployee = require('../MODELS/pumpEmployee');
const bookingModel=require('../MODELS/bookingModel');
const mongoose=require('mongoose')
const constants=require('../config/constants/const')

module.exports.addpump=async(req,res)=>
{
    try {
        let data=req.body;
     
        let saveData=await new pump({
            fuelAvailable:data.fuelAvailable,
            pumpName:data.pumpName,
            city:data.city,
            address:data.address,
            loc:data.loc
        })
        let result=await saveData.save();
      res.send(constants.CONSTANTS.SUCCESS_MSG.PUMP_ADDED_SUCCESSFULLY)
    
        
    } catch (e) {
        res.send(constants.CONSTANTS.ERROR_MSG.SOMETHING_WENT_WRONG)
        
    }
}

module.exports.addPumpEmploye=async(req,res)=>
{
    try {    
        let data=req.body;
    let verify=await pumpEmployee.findOne({ phoneNumber:data.phoneNumber,name:data.name})
      if(verify && verify.length  >  0)
      {
        let update=await pumpEmployee.findOneAndUpdate({name:data.name,phoneNumber:data.phoneNumber},{pumpId:data.pumpid})
        if(update && update.length > 0)
        {
            res.send(constants.CONSTANTS.SUCCESS_MSG.SUCCESSFULL_DONE)
        }
        else{
            res.send(constants.CONSTANTS.ERROR_MSG.NOT_UPDATED)
        }
      }
      else{
         
          let create=await pumpEmployee.create(data)
          res.send(constants.CONSTANTS.SUCCESS_MSG.SUCCESSFULL_DONE)
      }   
    } catch (err) {
        res.send(constants.CONSTANTS.ERROR_MSG.SOMETHING_WENT_WRONG)
    }
}

module.exports.addFillingEmploye=async(req,res)=>
{
    try {
        let data=req.body;
        let getBookingId=await bookingModel.findOneAndUpdate({_id:data.bookingId},{fillBy:data.employeeId,status:"confirm"})
        if(getBookingId )
        {
            res.status(200).send(getBookingId)
        }
        else{
            res.send(constants.CONSTANTS.ERROR_MSG.BOOKING_NOT_FOUND)
        }
        
    } catch (err) {
        res.send(constants.CONSTANTS.ERROR_MSG.SOMETHING_WENT_WRONG)
    }
    
}

module.exports.checkPumpBookingDetails=async(req,res)=>
{
    try {
   
        const result=await bookingModel.aggregate([
            {
                $match:
                {
                    pumpId: mongoose.Types.ObjectId(req.query.id)
                }
            },
            {$lookup:
                {
                    from:"users",
                    localField:"userId",
                    foreignField:"_id",
                    //pipeline:[{$match:{status:'active'}}],
                    as:"users"
                } 
           },
           { $addFields:    //that is only populate active user
            {
                users:
                {
                    $filter:
                    {
                        input: '$users',
                        cond: { $eq: ['$$this.status', 'active'] }
                    }
                }
            }
           },
           {$lookup:
                {
                    from:"pumpemployes",
                    localField:"fillBy",
                    foreignField:"_id",
                    as:"employe"
                } 
           },
        ])
        res.send(constants.CONSTANTS.SUCCESS_MSG.SUCCESSFULL_DONE,result)
        
    } catch (err) {
        res.send(constants.CONSTANTS.ERROR_MSG.SOMETHING_WENT_WRONG)
    }
}