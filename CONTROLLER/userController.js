const User = require('../MODELS/userModel');
const vehicle= require('../MODELS/vehicleModel');
const bookingModel=require('../MODELS/bookingModel')
const pump=require('../MODELS/pumpModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const constants=require('../config/constants/const')
const  mongoose  = require('mongoose');

module.exports.signUp = async (req, res) => {
    try {
        let check = await User.findOne({
            email: req.body.email
        })
        if (check) {
            res.status(401).send(constants.CONSTANTS.ERROR_MSG.EMAIL_ALREADY_EXISTS)
        } else {
            let token = await jwt.sign({
                email: req.body.email
            }, process.env.JWT_SECRET)
            let epasswod = await bcrypt.hashSync(req.body.password, 10)
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: epasswod,
                phoneNumber: req.body.phoneNumber,
                token: token
            })
            await user.save();
            res.status(200).json(constants.CONSTANTS.SUCCESS_MSG.SUCCESSFULL_DONE)
        }
    } catch (err) {
        res.status(400).json(constants.CONSTANTS.ERROR_MSG.SOMETHING_WENT_WRONG)
    }
}

module.exports.login=async(req,res)=>
{
 try {
    let check = await User.findOne({
        email: req.body.email
    })
    if(check)
    {
        if(bcrypt.compareSync(req.body.password,check.password))
        {
            let token = await jwt.sign({
                email: req.body.email,
                id:check._id
            }, process.env.JWT_SECRET)

            let updateUser=await User.findOneAndUpdate({email:req.body.email},{token:token})
            res.status(200).json(constants.CONSTANTS.SUCCESS_MSG.SUCCESSFULL_LOGGED_IN,{token:token})  
        }
        else{
            res.status(401).json(constants.CONSTANTS.ERROR_MSG.INVALID_PASSWORD)
        }
    }else{
        res.status(401).json(constants.CONSTANTS.ERROR_MSG.PARAMETER_MISSING)
    }   
 } catch (err) {
     res.status(400).json(constants.CONSTANTS.ERROR_MSG.SOMETHING_WENT_WRONG)
 }
}

module.exports.uploadImage=async(req,res)=>{
    try {
        console.log(req.file)
        let file=req.file.buffer
        let id=req.body.id
        let updateImage=await User.findOneAndUpdate({_id:id},{Image:file})
      res.status(200).send(constants.CONSTANTS.SUCCESS_MSG.SUCCESSFULL_UPLOAD_SUCCESSFULL)
    } catch (err) {
        res.status(401).json(constants.CONSTANTS.ERROR_MSG.SOMETHING_WENT_WRONG)
        
    }
}

module.exports.addVehicle=async(req,res)=>{
    try {
        let data=req.body
        let owner=req.user.id
        data.owner=owner;
        let addVehicle=await new vehicle(data)
        await addVehicle.save();
        res.status(200).json(constants.CONSTANTS.SUCCESS_MSG.SUCCESSFULL_DONE)
       
    } catch (err) {
        res.status(400).json(constants.CONSTANTS.ERROR_MSG.SOMETHING_WENT_WRONG)
        
    }
}


module.exports.fuelBooking=async(req,res)=>{
    try {
        let bookingData=req.body;
        bookingData.userId=req.user.id;
       let createBooking= await bookingModel.create(bookingData)
       if(createBooking )
       {
           res.send(constants.CONSTANTS.SUCCESS_MSG.BOOKING_SUCESSFULL)
       }
       else{
        res.send(constants.CONSTANTS.ERROR_MSG.BOOKING_FAILED)
       }
        
    } catch (err) {
        res.send(constants.CONSTANTS.ERROR_MSG.SOMETHING_WENT_WRONG)
        
    }
}

module.exports.findNearestPump=async(req,res)=>
{
    try {
        console.log("in")
        let long=Number(req.query.longitude)       
        let lat=Number(req.query.latitude)
        let userId=req.user.id;
         let findUser=await vehicle.findOne({owner:userId})
         let fuelRequired=findUser[0].fuelType;
         const result=await pump.find({
            "loc":{
                $geoNear: {
                    near: { type: "Point", coordinates: [ -73.99279 , 40.719296 ] },
                    distanceField: "dist.calculated",
                    maxDistance: 2,
                    query: { fuelAvailable: fuelRequired},
                    includeLocs: "dist.location",
                    spherical: true
                 }
            }                
    })
     res.send(constants.CONSTANTS.SUCCESS_MSG.SUCCESSFULL_DONE,result)
        
    } catch (err) {
        res.send(constants.CONSTANTS.ERROR_MSG.SOMETHING_WENT_WRONG)
        
    }
}