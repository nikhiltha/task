const express=require('express')
const multer=require('multer');
// const joiValidation=require('../joiValidation/user')
const userController=require('../CONTROLLER/userController')
const auth=require('../middleware/auth')
const validator = require('express-joi-validation').createValidator({})
var router=express.Router();
//multers function to upload images
const upload=multer({
    limits:{
        fileSize:3000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload image only'))
        }
        cb(undefined,true)
    }
})


//api for user signUp
router.post('/user',userController.signUp)

//api for user login
router.post('/user/login',userController.login)

//api for update users image
router.post('/user/update/image',upload.single('image'),userController.uploadImage)

//api for user to add their vehicle
router.post('/user/addvehicle',auth,userController.addVehicle);

//api for user find nearest pump from current location.........
router.get('/user/findNearestPump',auth,userController.findNearestPump)

//api for user for booking fuel 
router.post('/user/fuelBooking',auth,userController.fuelBooking);



module.exports=router