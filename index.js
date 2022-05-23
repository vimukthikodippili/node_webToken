/*
* npm i express
* npm i mongooose
* npm i body-paser
* npm i bcrypt
* npm i dotenv
* npm i nodemon -g
*
*
*
* */
const express=require('express');
const mongoose=require('mongoose');
const bodyPasser=require('body-parser')
require('dotenv').config()
const cors = require('cors')

const userRoute = require('./route/UserRoute')

const $serverPort=process.env.SERVER_PORT



const app = express();
app.use(cors)
app.use(bodyPasser.urlencoded({extended:false
    }));
app.use(bodyPasser.json());

mongoose.connect('mongodb://localhost:27017/gota',()=>{
    app.listen(3000,()=>{
        console.log('hsujfhkjrnode')
    })
})

app.use('/api/v1/user',userRoute);
