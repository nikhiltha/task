//require express 
var express = require('express')

//require bodyParser
var bodyParser = require('body-parser')

//require user routes
var userRoutes=require('./ROUTES/userRouter')

//import pump routes
var pumpRoutes=require('./ROUTES/pumpRouter')
require('dotenv').config()

//require db connection file
require('./dbConnection/dbconnection');
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/',userRoutes)
app.use('/',pumpRoutes)

var port=process.env.PORT_NUMBER


app.listen(port, () => {
    console.log('Server is up on port',port)
})


