
const jwt=require('jsonwebtoken');
const constants=require('../config/constants/const')


/**
 * @description authentication function for user used as middleware
 */

const auth=async(req,res,next)=>{
    try{
    const token = req.headers['authorization']
    if (token == null)
    {
     res.send(constants.CONSTANTS.ERROR_MSG.AUTHENTICATION_FAILED)
    }
    else{
      jwt.verify(token,process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
      }) 
    }
    }catch(e){
        res.send(constants.CONSTANTS.ERROR_MSG.VALIDATE_AUTHENTICATION)
    }
}

/**
 * @description authentication function for user used as middleware
 */



module.exports=auth