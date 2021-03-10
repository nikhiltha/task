exports.CONSTANTS={
    ERROR_MSG : {
       
        INVALID_AUTH_TOKEN : {
            statusCode:400,
            type: 'INVALID_AUTH_TOKEN',
            message : ' Invalid Auth token.'
        },
        ACCESS_TOKEN_REQUIRED:{
            statusCode:400,
            type: 'ACCESS_TOKEN_REQUIRED',
            message : ' Access Token is required'
        },
        PARAMETER_MISSING:{
            statusCode:400,
            type:'PARAMETER_MISSING',
            message:'parameters missing'
        },
        SOMETHING_WENT_WRONG:{
            statusCode:400,
            type:'SOMETHING_WENT_WRONG',
            message:'something went wrong'
        },
        EMAIL_ALREADY_EXISTS:{
            statusCode:400,
            type:'EMAIL_ALREADY_EXISTS',
            message:'email is already exists'
        },
        INVALID_PASSWORD:{
            statusCode:400,
            type:'INVALID_PASSWORD',
            message:'invalid password'
        },
        BOOKING_FAILED:{
            statusCode:400,
            type:'BOOKING_FAILED',
            message:'booking failed'
        },
        NOT_UPDATED:{
            statusCode:400,
            type:'NOT_UPDATED',
            message:'updation not successfull'
        },
      BOOKING_NOT_FOUND:{
            statusCode:400,
            type:'BOOKING_NOT_FOUND',
            message:'booking not found'
        },
        VALIDATE_AUTHENTICATION:{
            statusCode:400,
            type:'VALIDATE_AUTHENTICATION',
            message:'validate your authentication'
        },
        AUTHENTICATION_FAILED:{
            statusCode:400,
            type:'AUTHENTICATION_FAILED',
            message:'you are not authenticated to use this'
        },

    },

    SUCCESS_MSG:{

        SUCCESSFULL_DONE:{
            statusCode:200,
            type: 'SUCCESSFULL_DONE',
            message : 'successfully done!'
        },
        
        SUCCESSFULL_LOGGED_IN:{
            statusCode:200,
            type: 'SUCCESSFULL_LOGGED_IN',
            message : 'successfully login!'
        },
        SUCCESSFULL_UPLOAD_SUCCESSFULL:{
            statusCode:200,
            type: 'SUCCESSFULL_UPLOAD_SUCCESSFULL',
            message : 'image uploaded successfully!'
        },
        BOOKING_SUCESSFULL:{
            statusCode:200,
            type: 'BOOKING_SUCESSFULL',
            message : 'booking complete!'
        },
        PUMP_ADDED_SUCCESSFULLY:{
            statusCode:200,
            type: 'PUMP_ADDED_SUCCESSFULLY',
            message : 'pump added successfully!'
        }


    }
}