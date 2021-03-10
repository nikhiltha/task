const express=require('express')
const router= express.Router();
const pumpController=require('../CONTROLLER/pumpController');
const validator = require('express-joi-validation').createValidator({})
 
//api for admin to add pump
router.post('/addpump',pumpController.addpump)

//api for admin to add employee
router.post('/pump/addEmploye',pumpController.addPumpEmploye)

//here add the filling employe in booking...
router.post('/booking/addFillingEmploye',pumpController.addFillingEmploye)

//here we find all bookings details with user through pumpId
router.get('/bookingsDetail',pumpController.checkPumpBookingDetails)



//.....................................................
module.exports=router