require("dotenv").config();
const express = require('express');
// const { pool }= require('./config/connection');
// const port = 3000;
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const employeeRouter =require("./api/employee/employee.router");

app.use('/api/employee',employeeRouter);

app.listen(process.env.APP_PORT ,() => {
    console.log(`app is running :`,process.env.APP_PORT);
})
// pool.connect((err)=>{
//     if(err) 
//     console.log(err);
//     else
//     console.log("connected");
//   });